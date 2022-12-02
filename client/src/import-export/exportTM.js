

const exportTM = (store) => {
    console.log('exporting tilemap')
    const fileName = store.name;
    //const  jsonClone= JSON.parse(JSON.stringify(store))

    const exportingJson={
        compressionlevel:-1,
        height:store.height,
        infinite:false,
        layers:null,
        orientation:"orthogonal",
        renderorder:"right-down",
        tileheight:null,
        tilesets:null,
        tilewidth:null,
        type:"map",
        width:store.width
    }
    if(store.tilesets[0]){
        exportingJson.tilewidth=store.tilesets[0].pixel;
        exportingJson.tileheight=store.tilesets[0].pixel;
    }


    //handle tileset
    let tmp_arr2=[];
    let index=1;
    let counting_array=[]
    store.tilesets.forEach((tileset) => {
        const temp = translateTileset(tileset,store,index)
        tmp_arr2.push(temp)
        index+=(tileset.height*tileset.width);
        counting_array.push(index);
    })

    exportingJson.tilesets=tmp_arr2



    //handle layer
    let tmp_arr=[];
    store.layers.forEach((layer) => {
        
        const temp = translateLayer(layer,store,counting_array)
        tmp_arr.push(temp)
        //translatedlayerarray.push(temp)
    })
    exportingJson.layers=tmp_arr



    
    const json = JSON.stringify(exportingJson, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}

export default exportTM;

// layers.forEach((x) => {
//     const temp = translateLayer(x)
//     translatedlayerarray.push(temp)
// })

const translateLayer = (layer,store,counting_array) => {

    console.log(layer.data)
    //
    let current_layer={
        data:null,
        height:store.height,
        id:layer.id,
        name:layer.name,
        opacity:1,
        properties:null,
        type:"tilelayer",
        visible:!layer.hidden,
        width:store.width,
        x:0,
        y:0
    };
    //layer
    let temp_prop=[];
    layer.properties.forEach((property) => {
        const temp = translateProperty(property)
        temp_prop.push(temp)
    })
    current_layer.properties=temp_prop

    //data
    let tileArray=[];
    for(let y = 0; y < store.height; y++){
        for(let x = 0; x < store.width; x++){
            let key = `${x}-${y}`;
            if(layer.data[key]==null){
                tileArray.push(0);
            }
            else{
                let index=0;
                for(let i = 0; i < counting_array.length; i++){
                    let sum=0;
                    sum=layer.data[key][0]+store.tilesets[i].width*layer.data[key][1]+1+sum;
                    if(sum<counting_array[i]){
                        index=i;
                        break;
                    }
                }
                tileArray.push(layer.data[key][0]+store.tilesets[index].width*layer.data[key][1]+1)
            }
        }
    }
    current_layer.data=tileArray;


    return current_layer
}

const translateProperty = (property) => {
    let current_property={
        name:property.name,
        type:property.type,
        value:property.value
    };
    return current_property;
}


const translateTileset = (tileset,store,index) => {
    let current_tilset={
        columns:tileset.width,
        firstgid:index,
        image:`${tileset.name}.png`,
        imageheight:tileset.height*tileset.pixel,
        imagewidth:tileset.width*tileset.pixel,
        margin:0,
        name: tileset.name,
        spacing:0,
        tilecount:tileset.height*tileset.width,
        tileheight:tileset.pixel,
        tilewidth:tileset.pixel
    };
    return current_tilset;
}


// valueformat = [tilesetX, tilesetY, TilesetID]
// (tilesetX * tilesetWidth)+tilesetY + startingValue
// value = if TilesetID don't exist anymore set it to 0
// value = null

