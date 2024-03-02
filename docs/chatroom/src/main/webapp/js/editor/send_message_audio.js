// 本函数是 upload_message_audio 的回调函数
// blob 是音频数据
// filename 是文件名
function send_message_audio(data, filename) {
    let badgeClass = $('select#badge-class').val();
    let textClass = $('select#text-class').val();
    let username = sessionStorage.getItem("username");
    let audio_message = {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "badge-class": badgeClass,
        "text-class": textClass,
        "username": username,
        "message": JSON.stringify({
            "data": data,
            "filename": filename
        }),
        "room-id": parseInt($("#room-id").val()),
        "send-time": new Date(),
        "type": "audio"
    };
    $.ajax({
        type: 'POST',
        url: 'user-send-message-audio',
        data: {
            "data": JSON.stringify(audio_message)
        }
    }).fail(function () {
        if(localStorage.getItem("application-language")==="lang-zh") {
            appendModal("bg-danger text-white", "text-danger", "An Error Occurred", "Message Size Exceeded", "");
        } else {
            appendModal("bg-danger text-white", "text-danger", "遇到了问题", "消息内容过长", "");
        }
    });
}