function change_chat_background() {
    let userid = sessionStorage.getItem("user-id");
    let timestamp = new Date().getTime();
    let Filename = filename($("input#chat-background-to-change").val());
    // Example: chat-background-1-1280977330748-filename.jpg
    let NewFilename = "chat-background-" + userid + "-" + timestamp + "-" + Filename;
    // 上传文件到七牛云
    upload("#chat-background-to-change", NewFilename, upload_chat_background_callback);
}

function upload_chat_background_callback(result) {
    // 获取文件 URL 地址
    let chatBackgroundURL = getCloudRootPath() + result.key;
    // 判断文件 URL 地址是否存在
    if (chatBackgroundURL) {
        set_preferences("global-chat-background-image", chatBackgroundURL, "string", function (data) {
            if (data["result"] === 1) {
                set_chat_background(chatBackgroundURL);
                localStorage.setItem("chat-background", chatBackgroundURL);
            } else {
                console.log("change_chat_background.js upload_chat_background_callback error 2");
            }
        });
    } else {
        console.log("change_chat_background.js upload_chat_background_callback error");
    }
}

function set_chat_background(url) {
    $("#chat-background").css({
        "background-image": "url(" + url + ")",
        "background-repeat": "no-repeat",
        "background-attachment": "fixed",
        "background-position": "center",
        "background-size": "cover"
    });
}

function init_chat_background() {
    let chatBackgroundURL = localStorage.getItem("chat-background");
    if (chatBackgroundURL) {
        set_chat_background(chatBackgroundURL);
    }
}