import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "save-as";

const importTM = (auth,store,editStore,file,name,height,width) => {
    //var reader = new FileReader();
    var zip = new JSZip();
   
   
    zip.loadAsync(file).then(async function(zip) {
        var jsonflag=0
        Object.keys(zip.files).forEach(async (key) => {
            console.log(key);
            var file=zip.files[key];
            if(file.name.endsWith(".json") && jsonflag==0){
                var filename=file.name.slice(0,-5)
                jsonflag=1;
                //console.log("json");
                let json=await file.async("text");
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

                let tmp_layer_arr=[];
                json_obj.layers.forEach((layer) => {
                    const temp = translateLayer(layer,json_obj);
                })
            
                //tilemap.layers=tmp_layer_arr

                let tmp_tileset_arr=[];
                json_obj.tilesets.forEach((tileset) => {
                    const temp = translateTileset(tileset,json_obj);
                })
            
                //tilemap.tilesets=tmp_tileset_arr


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

 

        //tileset.img.src


        store.createNewTilemap(
            {
            user_id: auth.user._id,
            data: {
                name: name,
                height: height,
                width: width,
                pixel: pixel,
            },
        
        })
    };
    */


}

export default importTM



const translateLayer = (layer,json) => {
    console.log(json);
    console.log(layer);
}


const translateTileset = (tileset,json) => {
    console.log(json);
    console.log(tileset);
}