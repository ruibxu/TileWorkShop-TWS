
const importTM = (auth,store,editStore,file,name,height,width) => {
    let reader = new FileReader();
    reader.readAsText(file);
    var json;
    reader.onload = function() {
        json=reader.result;
        const json_obj=JSON.parse(json);
        console.log(json_obj)

        //tileheight

        const tilemap={
            name: name,
            height: json_obj.height,
            width: json_obj.width,
            layers: [],
            tileset: []
        };

        //tileset.img.src


        /*store.createNewTilemap(
            {
            user_id: auth.user._id,
            data: {
                name: name,
                height: height,
                width: width,
                pixel: pixel,
            },
        
        })*/



    };


}

export default importTM