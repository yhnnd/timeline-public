// 发送消息片段
function send_message_fragment(username, message, roomId, messageType, badgeClass, textClass) {
    // 生成消息体
    let msg = {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "badge-class": badgeClass,
        "text-class": textClass,
        "username": username,
        "message": message,
        "room-id": roomId,
        "send-time": new Date(),
        "type": messageType
    };
    // 发送消息
    window.websocket.send(JSON.stringify(msg));
}

// 发送消息
function sendMessage(roomId, message, messageType) {
    let badgeClass = $('select#badge-class').val();
    let textClass = $('select#text-class').val();
    let username = sessionStorage.getItem("username");
    let isSendSpecificMessage = false;
    if (roomId && message) {// 发送指定消息
        isSendSpecificMessage = true;
    } else {// 发送输入框中的消息
        roomId = parseInt($("#room-id").val());
        message = $('#message').val();
        messageType = "text";
    }
    if ($("#message-type-option-code").parent().hasClass("active")) {// 如果用户设置消息类型为 CODE
        messageType = "code";
    } else if ($("#message-type-option-html").parent().hasClass("active")) {// 如果用户设置消息类型为 HTML
        messageType = "html";
    }
    if (message.length > 255) {// 如果消息文本长度超出上限
        let n_segments = Math.ceil(message.length / 255);
        let segmentWrapperId = "segment-" + messageType + "-" + getRandom() + "-" + n_segments;
        for (let i = 0; i < n_segments; ++i) {
            let segment = message.substr(i * 255, 255);
            let segmentId = segmentWrapperId + "-" + (i + 1);
            send_message_fragment(username, segment, roomId, segmentId, badgeClass, textClass);
        }
    } else {// 如果消息文本长度未超出上限
        send_message_fragment(username, message, roomId, messageType, badgeClass, textClass);
    }
    if (!isSendSpecificMessage) {
        $('#message').val('');// 清空输入框
    }
}