function reply_message(message) {
    let editor = $("#editor");
    editor.css({"z-index": 1100});
    let btn = $(editor).find("#send-message-button");
    btn.removeAttr("onclick").attr({
        "data-chinese": "回复",
        "data-english": "reply"
    }).off("click").on("click", function () {
        reply_message_submit(message);
    });
    refresh_system_language(editor);
}

function reply_message_submit(message) {
    let messageInput = $("#message");
    $.post("reply-message", {
        "message-id": message.id,
        "message-user-id": message["user-id"],
        "room-id": message["room-id"],
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "username": sessionStorage.getItem("username"),
        "reply-message-text": messageInput.val(),
        "reply-message-type": "text"
    }, function (data) {
        messageInput.val('');// 清空输入框
        appendMessage(JSON.parse(data), {"allow-popup": false});
    });
}

function backup_message_input() {
    let editor = $("#editor");
    let btn = $(editor).find("#send-message-button");
    return {
        '#editor': {
            "style": {
                "z-index": ""
            }
        },
        "#send-message-button": {
            "onclick": btn.attr("onclick"),
            "data-chinese": btn.attr("data-chinese"),
            "data-english": btn.attr("data-english") ? btn.attr("data-english") : btn.html()
        }

    };
}

// 退出回复消息时执行
function reset_message_input(backup) {
    let editor = $("#editor");
    editor.css({"z-index": backup["#editor"]["style"]["z-index"]});
    editor.find("#send-message-button").off("click").attr({
        "onclick": backup["#send-message-button"]["onclick"],
        "data-chinese": backup["#send-message-button"]["data-chinese"],
        "data-english": backup["#send-message-button"]["data-english"]
    });
    refresh_system_language(editor);
}