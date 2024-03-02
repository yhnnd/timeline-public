// 是否允许隐藏滚动控制器
// 初始化（不上传到服务器）
function set_toggle_scroll_control(value) {
    localStorage.setItem("allow-toggle-to-hide-scroll-control", value);
    $("#button-toggle-to-hide-scroll-control").attr("data-value", value);
    ios_button_init("#advanced-field");
}

// 设置（上传到服务器）
function change_toggle_scroll_control(value) {
    set_preferences("allow-hide-scroll-control", value, "boolean", function (data) {
        if (data["result"] === 1) {
            set_toggle_scroll_control(value);
        }
    });
}

// 是否允许隐藏页面标题栏
// 初始化（不上传到服务器）
function set_toggle_page_header(value) {
    localStorage.setItem("allow-toggle-to-hide-page-header", value);
    $("#button-toggle-to-hide-page-header").attr("data-value", value);
    ios_button_init("#advanced-field");
}

// 设置（上传到服务器）
function change_toggle_page_header(value) {
    set_preferences("allow-hide-page-header", value, "boolean", function (data) {
        if (data["result"] === 1) {
            set_toggle_page_header(value);
        }
    });
}

// 是否允许隐藏消息输入框
// 初始化（不上传到服务器）
function set_toggle_message_input(value) {
    localStorage.setItem("allow-toggle-to-hide-message-input", value);
    $("#button-toggle-to-hide-message-input").attr("data-value", value);
    ios_button_init("#advanced-field");
}

// 设置（上传到服务器）
function change_toggle_message_input(value) {
    set_preferences("allow-hide-message-input", value, "boolean", function (data) {
        if (data["result"] === 1) {
            set_toggle_message_input(value);
        }
    });
}

// 初始化是否允许隐藏各页面组件
function init_toggle_page_components() {
    let allow_toggle_to_hide_scroll_control = localStorage.getItem("allow-toggle-to-hide-scroll-control");
    let allow_toggle_to_hide_page_header = localStorage.getItem("allow-toggle-to-hide-page-header");
    let allow_toggle_to_hide_message_input = localStorage.getItem("allow-toggle-to-hide-message-input");

    if (!allow_toggle_to_hide_scroll_control) allow_toggle_to_hide_scroll_control = 1;
    if (!allow_toggle_to_hide_page_header) allow_toggle_to_hide_page_header = 1;
    if (!allow_toggle_to_hide_message_input) allow_toggle_to_hide_message_input = 0;

    set_toggle_scroll_control(allow_toggle_to_hide_scroll_control);
    set_toggle_page_header(allow_toggle_to_hide_page_header);
    set_toggle_message_input(allow_toggle_to_hide_message_input);
}