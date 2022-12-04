
const importTM = (auth,store,editStore,file,name,height,width) => {
    let reader = new FileReader();
    reader.readAsText(file);
    var json;
    reader.onload = function() {
        json=reader.result;
        console.log(json);
    };
}

export default importTM