
const importTS = (auth,store,editTilesetStore, file,name,height,width,pixel) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    var img;
    reader.onload = function() {
        img=reader.result;
        //console.log(img);
        store.createNewTileset(
            {
            user_id: auth.user._id,
            data: {
                name: name,
                height: height,
                width: width,
                pixel: pixel,
            },
           
        },
        img)
    };
}

export default importTS