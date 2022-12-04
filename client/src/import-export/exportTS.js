

const exportTS = (store,canvasRef) => {
    
    var href = canvasRef.current.toDataURL();
    //const fileName='Hello'
    const fileName = store.name;
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

