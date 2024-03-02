function upload_message_audio(blob, filename, callback) {
    if(!sessionStorage.getItem("user-id")){
        appendModal("bg-danger text-white","text-danger","Warning","please log in first");
        return;
    }
    let reader = new FileReader();
    reader.onload = function (event) {
        let data = event.target.result;
        callback(data, filename);
    };
    reader.readAsDataURL(blob);
}