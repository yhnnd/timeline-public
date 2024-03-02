// 初始化页面和登录失败时调用的函数
// 负责显示登录注册页面，隐藏其他页面
function login_failed() {
    let body = $("body");

    // 隐藏所有的 tab
    $('[data-toggle="tab"]').not(".do-not-hide").hide();

    // 加载语言设置区
    let selectLanguage = $("#select-language-wrapper");
    if (selectLanguage.length) {
        selectLanguage.show();
    } else {
        body.prepend(
            '<div class="row" id="select-language-wrapper">' +
            '   <div class="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">' +
            '       <div class="card card-block text-center" style="background: rgba(255,255,255,0.3);">' +
            '           <h5 class="card-title mb-0">' +
            '               <span data-english="Language" data-chinese="语言" onclick="" onselectstart="javascript: return false;">Language</span>&nbsp;' +
            '               <div class="btn-group" data-toggle="buttons">' +
            '                   <div class="btn btn-secondary active" onclick="select_system_language(this)">' +
            '                       <input type="radio" name="language" id="lang-en" checked>' +
            '                       <span> English </span>' +
            '                   </div>' +
            '                   <div class="btn btn-secondary" onclick="select_system_language(this)">' +
            '                       <input type="radio" name="language" id="lang-zh">' +
            '                       <span> 中文 </span>' +
            '                   </div>' +
            '               </div>' +
            '           </h5>' +
            '       </div>' +
            '   </div>' +
            '</div>');
    }

    // 隐藏所有的 links
    $('.link-row,.link-prev,.link-next').hide();
    // 隐藏聊天窗口 tab（重要代码）
    $('[data-toggle="tab"][href="#chat"]').parent().hide();
    // 进入登录页面
    $('[data-toggle="tab"][href="#profile"]').trigger("click");

    // 加载登录页面背景
    let background = $("#login-background");
    if (background.length) {
        background.show();
    } else {
        $("<div>").attr({
            "id": "login-background",
            "data-style": "no-support"
        }).css({
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: window.innerHeight + "px",
            background: "url(img/login-background.jpg)",
            "background-size": "cover"
        }).prependTo(body);
    }
    // 设置登录窗口样式
    let tabContent = $(".tab-content").eq(0).css("background", "rgba(255,255,255,0.8)");
    if (isMobile()) {
        tabContent.addClass("px-3");
    }
}