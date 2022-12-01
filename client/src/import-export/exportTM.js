

const exportTM = (editStore) => {
    console.log('exporting tilemap')
    const fileName = editStore.name;
    //const  jsonClone= JSON.parse(JSON.stringify(editStore))

    const exportingJson={
        "compressionlevel":-1,
        "height":editStore.height,
        "infinite":false,
        // need to change
        "layers":[
            { 
                "data":[],
                "height":editStore.height,
                "id":1,
                "name":"background",
                "opacity":1,
                "type":"tilelayer",
                "visible":true,
                "width":editStore.width,
                "x":0,
                "y":0
            },
        ],
        "orientation":"orthogonal",
        "renderorder":"right-down",
        "tileheight":editStore.scale,// question
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
        "tilewidth":editStore.scale,
        "type":"map",
        "width":editStore.width
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

export default exportTM

