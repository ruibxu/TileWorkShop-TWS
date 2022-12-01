

const exportTM = (store) => {
    console.log('exporting tilemap')
    const fileName = store.name;
    //const  jsonClone= JSON.parse(JSON.stringify(store))

    const exportingJson={
        "compressionlevel":-1,
        "height":store.height,
        "infinite":false,
        // need to change
        "layers":[
            { 
                "data":[],
                "height":store.height,
                "id":1,
                "name":"background",
                "opacity":1,
                "type":"tilelayer",
                "visible":true,
                "width":store.width,
                "x":0,
                "y":0
            },
        ],
        "orientation":"orthogonal",
        "renderorder":"right-down",
        "tileheight":store.scale,// question
        // need to change
        "tilesets":[
                {
                "columns":10,
                "firstgid":1,
                "image":"Hello.png",
                "imageheight":320,
                "imagewidth":320,
                "margin":0,
                "name":"tileset",
                "spacing":0,
                "tilecount":100,
                "tileheight":32,
                "tilewidth":32
                }],
        "tilewidth":store.scale,
        "type":"map",
        "width":store.width
    }
    
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

// translateLayer = (x) => {
//     for(let x = 0, x < tilemapwidth; x++){
//         for(let y = 0, y < tilemapheight; y++){
//             key = `${x}-${y}`
//         }
//     }
//     return translatedX
// }

// valueformat = [tilesetX, tilesetY, TilesetID]
// (tilesetX * tilesetWidth)+tilesetY + startingValue
// value = if TilesetID don't exist anymore set it to 0
// value = null

