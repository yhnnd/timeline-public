function set_message_style() {
    // 设置用户消息气泡样式
    let abw = $("#avatar-border-width").val();
    let abs = $("#avatar-border-style").val();
    let abc = $("#avatar-border-color").html();
    let mbw = $("#message-border-width").val();
    let mbs = $("#message-border-style").val();
    let mbc = $("#message-border-color").html();
    let message_style = {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "avatar-class": $("#avatar-class").val(),
        "avatar-border": abw + " " + abs + " " + abc,
        "avatar-border-radius": $("#avatar-border-radius").val(),
        "username-text-class": $("#username-text-class").val(),
        "username-badge-class": $('#badge-class').val(),
        "message-text-class": $('#text-class').val(),
        "message-background-class": $("#alert-class").val(),
        "message-border": mbw + " " + mbs + " " + mbc,
        "message-border-radius": $("#message-border-radius").val()
    };
    $.post("message-style", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "data": JSON.stringify(message_style),
        "action": "set"
    }, function (data) {

    });
}

function get_message_style(query_user_id, callback) {
    $.getJSON("message-style", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "query-user-id": query_user_id,
        "action": "get"
    }, function (data) {
        callback && callback(data);
    });
}

function init_my_message_style() {
    get_message_style(sessionStorage.getItem("user-id"), function (data) {
        if (data) {
            // 用户名徽章样式
            if (data["username-badge-class"]) {
                $('#badge-class').val(data["username-badge-class"]);
                selectUsernameBadgeStyle($('#badge-class'));
            }
            // 用户名文本样式
            if (data["username-text-class"]) {
                $('#username-text-class').val(data["username-text-class"]);
                selectUsernameTextStyle($('#username-text-class'));
            }
            // 消息文本样式
            if (data["message-text-class"]) {
                $('#text-class').val(data["message-text-class"]);
                selectMessageTextStyle($('#text-class'));
            }
            // 消息氣泡背景样式
            if (data["message-background-class"]) {
                $('#alert-class').val(data["message-background-class"]);
                selectMessageBackgroundStyle($('#alert-class'));
            }
        } else {
            throw new Error("user has no message style");
        }
    });
}