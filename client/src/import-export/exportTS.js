

const exportTS = (editTilesetStore) => {
    console.log('exporting tileset')
    const img=document.getElementById('tilesetCanvas')
    var href = img.toDataURL();
    const fileName='Hello'
    //const fileName = editStore.name;
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".png";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}

export default exportTS

