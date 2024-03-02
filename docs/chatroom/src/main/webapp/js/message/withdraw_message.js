function withdraw_message(message_id, callback) {
    $.getJSON("withdraw-message", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "message-id": message_id
    }, function (data) {
        callback(data);
    });
}