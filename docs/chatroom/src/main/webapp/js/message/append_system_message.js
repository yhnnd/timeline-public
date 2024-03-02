// 用户端的系统消息
function appendSystemMessage(data) {
    if (!data["badge-class"]) {
        data["badge-class"] = "default";
    }
    if (!data["text-class"]) {
        data["text-class"] = "muted";
    }
    if (!data["user-id"]) {
        data["user-id"] = 0;
    }
    if (!data["username"]) {
        data["username"] = "system";
    }
    if (!data["send-time"]) {
        data["send-time"] = new Date().getTime();
    }
    appendMessage(data);
}