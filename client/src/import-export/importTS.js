
const importTS = (store, file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    var img;
    reader.onload = function() {
        img=reader.result;
        console.log(img);
    };
}

export default importTS