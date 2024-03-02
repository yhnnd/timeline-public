// 发送图片消息
function send_message_image(data) {
    var badgeClass = $('select#badge-class').val();
    var textClass = $('select#text-class').val();
    var username = sessionStorage.getItem("username");
    var message = getCloudRootPath() + data.key;
    if(username.trim() === "system"){
        appendSystemMessage({"badge-class":"danger","text-class":"danger","username":"error","message":"username not available"});
        return false;
    } else if(username === undefined){
        $("#username").attr("placeholder","username is required");
        return false;
    } else if(message === undefined){
        $("#message").attr("placeholder","message is required");
        return false;
    }
    // 生成消息体
    var msg = {
        "user-id": sessionStorage.getItem("user-id"),
        "badge-class": badgeClass,
        "text-class": textClass,
        "username": username,
        "message": message,
        "room-id": parseInt($("#room-id").val()),
        "send-time": new Date(),
        "type": "image"
    };
    // 发送消息
    websocket.send(JSON.stringify(msg));
}