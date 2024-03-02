// 上传图片文件
function upload_message_image(fileInput,callback) {
    let fileInputValue = $(fileInput).val();
    if(fileInputValue !== "") {
        let userid = sessionStorage.getItem("user-id");
        let timestamp = new Date().getTime();
        let imageFilename = filename(fileInputValue);
        // Example: message-image-1-1280977330748-filename.jpg
        let messageImageFilename = "message-image-" + userid + "-" + timestamp + "-" + imageFilename;
        // 上传头像文件到七牛云
        upload(fileInput, messageImageFilename, callback);
    }
}