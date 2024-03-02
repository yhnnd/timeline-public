function change_avatar() {
    let userid = sessionStorage.getItem("user-id");
    let timestamp = new Date().getTime();
    let AvatarFilename = filename($("input#avatar-to-change").val());
    // Example: avatar-1-1280977330748-filename.jpg
    let AvatarNewFilename = "avatar-" + userid + "-" + timestamp + "-" + AvatarFilename;
    // 上传头像文件到七牛云
    upload("#avatar-to-change",AvatarNewFilename,upload_avatar_callback);
}

function upload_avatar_callback(result) {
    // 头像文件的 URL 地址
    let AvatarURL = getCloudRootPath() + result.key;
    // 判断头像文件 URL 地址是否存在
    if(AvatarURL!==undefined) {
        // 将头像文件 URL 存储到数据库中
        $.post("change/avatar", {
            "user-id": sessionStorage.getItem("user-id"),
            "session-id": sessionStorage.getItem("session-id"),
            "new-avatar": AvatarURL
        }, function (data) {
            refresh_user();
            appendMessage(JSON.parse(data));
        });
    } else {
        // 头像文件 URL 不存在
        console.log("change_avatar.js upload_avatar_callback error");
    }
}