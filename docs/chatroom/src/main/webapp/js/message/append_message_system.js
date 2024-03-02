// system message from the server
function append_message_system(data) {
    if ((data.message.indexOf("wrong") >= 0 && data.message.indexOf("password") >= 0) || // wrong username or password
        (data.message.indexOf("user") >= 0 && data.message.indexOf("online") >= 0) || // user is online
        (data.message.indexOf("login") >= 0 || data.message.indexOf("log in") >= 0) || // log in
        (data.message.indexOf("logout") >= 0 || data.message.indexOf("log out") >= 0) || // log out
        (data.message.indexOf("signup") >= 0 || data.message.indexOf("sign up") >= 0) // sign up
    ) {
        if (data.message.indexOf("login success") >= 0 || data.message.indexOf("log in success") >= 0) {
            // 如果系统消息是登录成功，执行登录成功函数
            login_success();// 记住用户名和密码
        } else {
            if (data.message === "log out success") {
                remove_loading_icon();
                login_failed();
            }
            appendModal(data["badge-class"] + " text-white", data["text-class"], data.username, data.message);
        }
        $("#username,#password").attr("placeholder", data.message);
        $("#password").val("");// 清空密码输入框
    } else if (data.type === "more messages") {
        // 如果消息是 more messages (更多消息)，不用弹窗
    } else {
        appendModal(data["badge-class"] + " text-white", data["text-class"], data.username, data.message);
    }
    // 如果被强制下线，隐藏其他页面，进入登录页面
    if (data.type === "compulsory disconnect" || data.type === "compulsory logout") {
        login_failed();
    }
}
