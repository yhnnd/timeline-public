function set_preferences(property_name, property_value, property_type, callback) {
    if (sessionStorage.getItem("user-id") && sessionStorage.getItem("session-id")) {
        let args = arguments;
        $.post("preferences", {
            "user-id": sessionStorage.getItem("user-id"),
            "session-id": sessionStorage.getItem("session-id"),
            "property-name": property_name,
            "property-value": property_value,
            "property-type": property_type
        }, function (data) {
            log.line({
                title: "set_preferences()",
                filename: "settings/preferences.js",
                name: "jQuery post 'preferences' callback data",
                text: [JSON.stringify(args), data]
            });
            callback && callback(JSON.parse(data));
        });
    }
}

function get_preferences(callback) {
    if (sessionStorage.getItem("user-id") && sessionStorage.getItem("session-id")) {
        $.getJSON("preferences", {
            "user-id": sessionStorage.getItem("user-id"),
            "session-id": sessionStorage.getItem("session-id")
        }, function (data) {
            log.line({
                title: "get_preferences()",
                filename: "settings/preferences.js",
                name: "jQuery getJSON 'preferences' callback data",
                text: JSON.stringify(data)
            });
            callback && callback(data);
        });
    }
}

// 加载首选项
function init_preferences() {
    get_preferences(function (preferences) {
        // 激活控制按回车发送的开关
        if (preferences["is-press-enter-to-send"]) {
            localStorage.isPressEnterToSend = preferences["is-press-enter-to-send"];
        }
        $("#toggle-press-enter-to-send").attr("data-value", localStorage.isPressEnterToSend);
        ios_button_init("#keymap-field");
        // 加载系统语言
        if (preferences["application-language"]) {
            change_system_language(preferences["application-language"]);
        }
        // 加载账户背景
        if (preferences["profile-page-background-image"]) {
            localStorage.setItem("profile-background", preferences["profile-page-background-image"]);
            init_profile_background();
        }
        // 加载聊天背景
        if (preferences["global-chat-background-image"]) {
            localStorage.setItem("chat-background", preferences["global-chat-background-image"]);
            init_chat_background();
        }
        // 初始化夜间模式
        if (preferences["is-dark-mode"]) {
            localStorage.setItem("is_dark_mode", preferences["is-dark-mode"]);
            init_dark_mode(init_dark_mode_end);
        }
        // 初始化是否允许隐藏各页面组件
        if (preferences["allow-hide-scroll-control"]) {
            let value = preferences["allow-hide-scroll-control"];
            localStorage.setItem("allow-toggle-to-hide-scroll-control", [true, "true", 1].includes(value) ? "1" : "0");
        }
        if (preferences["allow-hide-page-header"]) {
            let value = preferences["allow-hide-page-header"];
            localStorage.setItem("allow-toggle-to-hide-page-header", [true, "true", 1].includes(value) ? "1" : "0");
        }
        if (preferences["allow-hide-message-input"]) {
            let value = preferences["allow-hide-message-input"];
            localStorage.setItem("allow-toggle-to-hide-message-input", [true, "true", 1].includes(value) ? "1" : "0");
        }
        init_toggle_page_components();
    });
}