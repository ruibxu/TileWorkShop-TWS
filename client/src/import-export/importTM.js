import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "save-as";
const ObjectId = require('mongoose').Types.ObjectId;

const importTM = (auth,store,editStore,file,name,height,width) => {
    //var reader = new FileReader();
    var zip = new JSZip();
   
   
    zip.loadAsync(file).then(async function(zip) {
        var jsonflag=0
        Object.keys(zip.files).forEach(async (key) => {
            console.log(key);
            var file=zip.files[key];
            if(file.name.endsWith(".json") && jsonflag==0){
                jsonflag=1;
                let json= await file.async("text");
                const tilemap= await makeTileMap(file,zip,json)

                const temp={
                    user_id: auth.user._id,
                    data: tilemap
                }

                var res=await store.createNewTilemap(temp,true)
                
                console.log(res);
                console.log("what")
            }        
            /*else if(file.name.endsWith(".png")){
                console.log("png");
                const img=await file.async("base64")
                console.log(img);
            }*/ 
            //else{
                //return;
            //}
        })
        //console.log(zip.files[Object.keys(zip.files)[1]].name.endsWith(".json"))
        //console.log(zip.files[Object.keys(zip.files)[0]].dir)
        //zip.files[Object.keys(zip.files)[1]]
        //zip.file("hello.txt").async("string"); // a promise of "Hello World\n"
    });
    

    //console.log(json_obj)
    //



    /*.then(function(zip2) {
        // you now have every files contained in the loaded zip
        zip2.file("hello.txt").async("string"); // a promise of "Hello World\n"
    });
    */

    /*reader.readAsText(file);
    var json;
    reader.onload = function() {
        json=reader.result;
        const json_obj=JSON.parse(json);
        console.log(json_obj)

        //tileheight

    };
    */


}

export default importTM


const makeTileMap =(file,zip,json) => {
    
    var filename=file.name.slice(0,-5)
    
    console.log(json);
    
    const json_obj=JSON.parse(json);
    //console.log(json_obj)

    console.log(filename)
    const tilemap={
        name: filename,
        height: json_obj.height,
        width: json_obj.width,
        layers: null,
        tileset: null
    };

    var objectId_array=[]
    let tmp_tileset_arr=[];
    json_obj.tilesets.forEach((tileset) => {
        var objectId= new ObjectId();
        console.log(objectId);
        objectId_array.push(objectId);
        const temp = translateTileset(tileset,json_obj,zip,objectId);
        console.log(temp);
        //temp.then((t) => tmp_tileset_arr.push(t));
        tmp_tileset_arr.push(temp);
    })

    console.log(tmp_tileset_arr)

    let tmp_layer_arr=[];
    json_obj.layers.forEach((layer) => {
        const temp = translateLayer(layer,json_obj,objectId_array);
        tmp_layer_arr.push(temp);
    })

    tilemap.layers=tmp_layer_arr;
    tilemap.tileset=tmp_tileset_arr;

    console.log(tilemap);

}


const translateLayer = (layer,json,object_id_array) => {
    console.log(json);
    console.log(layer);

    let current_layer={
        id:layer.id,
        name:layer.name,
        hidden:!layer.visible,
        locked: false,
        data:null,
        properties:null,
    };

    if(layer.locked){
        current_layer.locked=layer.locked
    }

    let temp_prop=[];
    layer.properties.forEach((property) => {
        const temp = translateProperty(property)
        temp_prop.push(temp)
    })
    current_layer.properties=temp_prop


    let temp_data=[];
    for(let i=0;i<layer.data.length;i++){
        if(layer.data[i]!=0){ 
            let count=0;
            let temp_firstgid=0;
            json.tilesets.forEach((tileset) => {
                if(layer.data[i]>=tileset.firstgid){
                    count++;
                }else{
                    temp_firstgid=tileset.firstgid
                }
            })

            let height=Math.floor((layer.data[i]-temp_firstgid)/layer.width)//second arg
            let width=(layer.data[i]-temp_firstgid)%layer.width //first arg
            let id=object_id_array[count];
            temp_data.push({0:width,1:height,2:id});
            //tileset id
        }
    }
    current_layer.data=temp_data;

    return current_layer;


}


const translateTileset = (tileset,json,zip,id) => {
    //tileset _id
    let current_tileset={
        //_id:null,
        name: tileset.name,
        pixel:tileset.tilewidth,
        height:tileset.imageheight/tileset.tileheight,
        width:tileset.imagewidth/tileset.tilewidth,
        image:null
    };
    let file=zip.files[`${tileset.name}.png`]
    getImage(file).then((image) =>current_tileset.image=(image))
    console.log(current_tileset)
    //current_tileset.then((tileset) => {return tileset})
    return current_tileset;
}

const getImage= (file)=>{
    let img;
    const temp= file.async("base64").then((data)=>img=data);
    //Promise.resolve(temp)
    //console.log(img)
    //console.log(temp)
    return temp;
    //return 
}


const translateProperty = (property) => {
    let current_property={
        name:property.name,
        type:property.type,
        value:property.value
    };
    return current_property;
}