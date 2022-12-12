import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "save-as";

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
    let layers=JSON.parse(JSON.stringify(store.layers))
    layers=layers.reverse();
    layers.forEach((layer) => {
        const temp = translateLayer(layer,store,counting_array)
        tmp_arr.push(temp)
        //translatedlayerarray.push(temp)
    })
    exportingJson.layers=tmp_arr


    /*
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
    */
    
    const json = JSON.stringify(exportingJson, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const jsonfile = new File([blob], fileName + ".json");
    const jsonName=fileName + ".json";
    
    var zip = new JSZip();
    zip.file(jsonName, jsonfile, { binary: true });


    store.tilesets.forEach((tileset) => {
            console.log(tileset.image.src)
            zip.file(tileset.name+".png",urlToPromise(tileset.image.src), { binary: true });
    })


    zip.generateAsync({type:"blob"}).then(function (blob) { 
        saveAs(blob, fileName +".zip");                    
    });


}

export default exportTM;


const  urlToPromise=(url) => {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// layers.forEach((x) => {
//     const temp = translateLayer(x)
//     translatedlayerarray.push(temp)
// })

const translateLayer = (layer,store,counting_array) => {

    console.log(layer.data)
    //

    //layer id problem
    let current_layer={
        data:null,
        height:store.height,
        id:layer.id,
        locked: layer.locked,
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
    console.log(layer.data)
    for(let y = 0; y < store.height; y++){
        for(let x = 0; x < store.width; x++){
            let key = `${x}-${y}`;
            if(layer.data[key]==null){
                tileArray.push(0);
            }
            else{
                let index=-1;
                let value=0;
                for(let i=0;i<store.tilesets.length;i++){
                    console.log(store.tilesets[i]._id)
                    if(store.tilesets[i]._id==layer.data[key][2]){
                        index=i;
                        break;
                    }
                }
                if(index==-1){ 
                    tileArray.push(0);
                }
                else{
                    let value=1;
                    if(index>0){
                        value=counting_array[index-1];
                        //console.log(value);
                    }
                    tileArray.push(layer.data[key][0]+store.tilesets[index].width*layer.data[key][1]+value)
                }
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

