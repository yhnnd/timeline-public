function open_temporary_chats() {
    // 包裹背景
    $("body>*")
        .not("script")
        .not(".temporary-chats-background")
        .wrap("<div class='temporary-chats-background'>");
    // 配置背景
    $(".temporary-chats-background")
        .css("filter", "blur(1px)")
        .on("click", function (e) {
            e.preventDefault();
        });
    // 显示前景
    let foreground = $("<div>")
        .addClass("fixed-top d-block w-100 temporary-chats-foreground")
        .attr("data-style", "no-support")
        .css("height", window.innerHeight + "px")
        .css("background", "rgba(0, 0, 0, 0.3)")
        .appendTo("body");

    // 加载前景内容【临时消息列表区域】
    foreground.append("<div class='p-3 bg-faded text-center d-flex align-items-center'>" +
        "   <i class='fa fa-envelope-o fa-lg'></i>" +
        "   <span class='ml-auto' data-chinese='临时会话（开发中）'>Temporary Chats (Developing)</span>" +
        "   <i class='fa fa-times fa-lg text-danger float-right ml-auto' onclick='close_temporary_chats()'></i>" +
        "</div>" +
        "<div class='mt-2' id='temporary-chat-list-wrapper'>" +
        "   <div class='bg-faded text-left text-lg-center' id='temporary-chat-list-field'>" +
        "   </div>" +
        "</div>");
    // 加载临时消息列表
    for (let i = 0; i < 3; ++i) {
        $("#temporary-chat-list-field").append(
            "<div class='p-3 d-flex align-items-center justify-content-between justify-content-lg-around'>" +
            "   <div>" +
            "       <img style='width: 2rem;height: 2rem;'>" +
            "       <span class='text-primary ml-2'>测试用户 " + i + "</span>" +
            "   </div>" +
            "   <span class='badge badge-pill badge-info'>1</span>" +
            "</div>");
    }
    refresh_system_language(".temporary-chats-foreground");
}

function close_temporary_chats() {
    $(".temporary-chats-foreground").remove();
    $(".temporary-chats-background>*").unwrap();
}