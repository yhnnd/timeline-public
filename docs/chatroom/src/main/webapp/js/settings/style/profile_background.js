function change_profile_background() {
    let fileInput = $("input#profile-background-to-change");
    let userid = sessionStorage.getItem("user-id");
    let timestamp = new Date().getTime();
    let Filename = filename(fileInput.val());
    // Example: profile-background-1-1280977330748-filename.jpg
    let NewFilename = "profile-background-" + userid + "-" + timestamp + "-" + Filename;
    // 上传文件到七牛云
    upload(fileInput, NewFilename, upload_profile_background_callback);
}

function upload_profile_background_callback(result) {
    // 获取文件 URL 地址
    let profileBackgroundURL = getCloudRootPath() + result.key;
    // 判断文件 URL 地址是否存在
    if (profileBackgroundURL) {
        set_preferences("profile-page-background-image", profileBackgroundURL, "string", function (data) {
            if (data["result"] === 1) {
                set_profile_background(profileBackgroundURL);
                localStorage.setItem("profile-background", profileBackgroundURL);
            } else {
                console.log("change_profile_background.js upload_profile_background_callback error 2");
            }
        });
    } else {
        console.log("change_profile_background.js upload_profile_background_callback error 1");
    }
}

function set_profile_background(url) {
    let account_field = $("#account-field");
    $(account_field).css({
        "padding-top": "20px",
        "background-image": "url(" + url + ")",
        "background-repeat": "no-repeat",
        "background-attachment": "scroll",
        "background-position": "center",
        "background-size": "cover"
    });
    $(account_field)
        .find(".btn-outline-danger")
        .removeClass("btn-outline-danger")
        .addClass("btn-danger")
        .css("opacity", "0.8");
    $(account_field)
        .find(".btn-outline-secondary")
        .removeClass("btn-outline-secondary")
        .addClass("btn-secondary")
        .css("opacity", "0.7");
}

function init_profile_background() {
    let profileBackgroundURL = localStorage.getItem("profile-background");
    if (profileBackgroundURL) {
        set_profile_background(profileBackgroundURL);
    }
}