// 用户登录
function login() {
    login_failed();
    let loginBy = $("#login-by").attr("data-login-by");
    window.websocket.send(JSON.stringify({
        [loginBy]: $("#username").val(),
        "password": $("#password").val(),
        "type": "login",
        "by": loginBy
    }));
    // 登錄數據已發送，若登錄成功，會調用 append_message_login 函數
}

// Enable 切换登录方式
function init_login_method() {
    let selectedOption = $("#login-by");
    let options = $("#login-by-options").find("button").not(".not-available");
    options.off("click").on("click", function () {
        let method = $(this).attr("data-login-by");
        let text = $(this).html();
        selectedOption.html(text).attr("data-login-by", method);
        options.removeClass("disabled");
        $(this).addClass("disabled");
    });
}

// 自动登录
function auto_login() {
    let autoLogin = localStorage["login-auto"];
    let loginBy = localStorage["login-by"];
    let username = localStorage["login-username"];
    let password = localStorage["login-password"];
    if (autoLogin && loginBy && username && password) {
        $("#auto-login").attr("checked", "true");
        $(`[data-login-by='${loginBy}']`).click();
        $('#username').val(username);
        $('#password').val(password);
        $("#login").click();
    }
}