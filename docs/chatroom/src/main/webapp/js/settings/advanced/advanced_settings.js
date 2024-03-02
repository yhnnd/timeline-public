// 获取高级设置信息，初始化高级设置按钮
function init_advanced_settings() {
    // ! 只能用 get 方法
    $.get("advanced", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id")
    }, function (result) {
        log.line({
            title: "init_advanced_settings()",
            filename: "settings/advanced_settings.js",
            name: "jQuery get 'advanced' callback data",
            text: result
        });
        let data = JSON.parse(result);
        $("#button-allow-multiple-online-devices").attr("data-value", data["allow-multiple-online-devices"]);
        $("#button-allow-compulsory-disconnect").attr("data-value", data["allow-compulsory-disconnect"]);
        ios_button_init("#advanced-field");
    });
}

// 更新高级设置
function set_advanced_settings(valueName, value) {
    let args = arguments;
    let formData = {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id")
    };
    formData[valueName] = value;
    // ! 只能用 post 方法
    $.post("advanced", formData, function (data) {
        log.line({
            title: "set_advanced_settings()",
            filename: "settings/advanced_settings.js",
            name: "jQuery post 'advanced'",
            text: [
                "<var>arguments</var><br/>" + JSON.stringify(args),
                "<var>form data</var><br/>" + JSON.stringify(formData),
                "<var>response</var><br/>" + JSON.parse(data).message
            ]
        });
    });
}

function set_multiple_online_devices(value) {
    set_advanced_settings("allow-multiple-online-devices", value);
}

function set_compulsory_disconnect(value) {
    set_advanced_settings("allow-compulsory-disconnect", value);
}