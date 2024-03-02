// 登录成功后调用的函数
// 负责隐藏登录注册页面，显示其他页面
function login_success() {
    // 显示所有的 tab
    $('[data-toggle="tab"]').show();
    // 隐藏语言设置区
    $('#select-language-wrapper').hide();
    // 显示所有的 links
    $('.link-row,.link-prev,.link-next').show();
    // 进入聊天列表页面
    $("[data-toggle='tab'][href='#chat-list']").trigger("click");
    // 记住用户名和登录密码
    let autoLogin = $('#auto-login').is(':checked');
    if (autoLogin) {
        localStorage["login-auto"] = autoLogin;
        localStorage["login-by"] = $("#login-by").attr("data-login-by");
        localStorage["login-username"] = $("#username").val();
        localStorage["login-password"] = $("#password").val();
    }
    // 隐藏登录页面背景
    $("#login-background").hide();
    // 删除登录窗口样式
    $(".tab-content").eq(0).css("background", "").removeClass("px-3");
}