// 返回聊天室消息数组的长度
function get_room_message_count(roomId, callback) {
    $.getJSON("messages", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": roomId
    }, function (data) {
        callback && callback(data);
    });
}

// 加载聊天室的消息记录
function get_room_messages(roomId, messageMax, callback) {
    let args = arguments;
    // 清空聊天窗口中的消息和消息复选框
    $('#messages').find('h5,.select-message-checkbox').remove();
    // 获取聊天室的消息记录
    $.post("messages", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": roomId,
        "message-max": messageMax
    }, function (responseText) {
        let data = JSON.parse(responseText);
        // 添加消息顶部文本
        let messageTop = $("<h5>")
            .text("no more message")
            .attr("data-chinese", "没有更多消息了")
            .addClass('text-muted text-center button-load-more-messages')
            .css({
                "height": "10rem",
                "padding-top": "4.2rem",
                "font-size": "1.6rem",
                "font-weight": "300",
                "background": "rgba(252, 248, 227, 0.5)"
            });
        messageTop.appendTo("#messages");
        // 记录日志
        log.line({
            title: "get_room_messages()",
            filename: "room/get_room_messages.js",
            name: "jQuery getJSON 'messages' callback data",
            text: [JSON.stringify(args), JSON.stringify(data)]
        });
        // 加载所有消息
        for (let i = 0; i < data.length; ++i) {
            appendMessage(data[i]);
        }
        refresh_system_language("#messages");
        callback && callback();
    });
}