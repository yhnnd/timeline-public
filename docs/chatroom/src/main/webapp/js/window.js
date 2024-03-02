window.onload = function () {
    // 初始化 settings > style 中的边框选择器
    init_border_selector();
    if (isMobile()) {// 只作用于手机
        // 去除 container 的 margin 和 padding
        $(".container").removeClass("container").addClass("container-fluid");
        // 将房间名的字体变小
        let roomName = $("#room-name");
        $("#room-description").empty().append($(roomName).html());
        $(roomName).remove();
        $("#room-description").attr("id", "room-name").css("margin-bottom", "0");
    } else {// 只作用于 iPad 和电脑
        // 删除手机 links
        $('.link-row,.link-prev,.link-next').remove();
    }

    // 隐藏消息输入框的插件
    $('#editor .input-group-addon').hide();

    // 在房间名右侧添加设置按钮
    $("#room-name")
        .append("<div class='btn btn-sm btn-outline-primary size-important mx-2 my-1' onclick='room_info()' data-chinese='基本信息'>settings</div>");

    // 将所有非 .size-important 的小按钮变成默认按钮
    $('.btn').not('.size-important').removeClass('btn-sm btn-xs');
    // 将所有非 .size-important 的小输入框变成默认输入框
    $('.input-group').not('.size-important').removeClass('input-group-sm');

    // 初始化所有标签的中文和英文
    init_system_language();
    let lang = localStorage["application-language"];
    if (!lang) lang = "lang-en";
    change_system_language(lang);

    // 加载页面时，调用登录失败函数，显示登录注册页面，隐藏其他页面。
    login_failed();

    // 初始化录音功能
    init_audio_record();

    // 监听消息输入框按键
    init_press_enter_to_send();

    // 初始化夜间模式
    init_dark_mode(init_dark_mode_end);

    // 初始化切换登录方式
    init_login_method();

    window.websocket = new WebSocket("ws://" + getWebRoot() + "/websocket");

    window.websocket.onopen = function () {
        sessionStorage.setItem("connection-status", "online");
        auto_login();
    };

    window.websocket.onclose = function () {
        sessionStorage.setItem("connection-status", "offline");
    };

    window.websocket.onmessage = function (event) {
        appendMessage(JSON.parse(event.data), {"allow-popup": true});
    };

    window.websocket.onerror = function () {
        append_message_no_connection();
    };

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="dropdown"]').dropdown();
};

// 监听窗口关闭事件
window.onbeforeunload = function () {
    logout();
    websocket && websocket.close();
};