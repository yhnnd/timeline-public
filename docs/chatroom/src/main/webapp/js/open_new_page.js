function open_new_page(foregroundClass, backgroundClass) {
    // 包裹背景
    $("body>*")
        .not("script")
        .not("." + backgroundClass)
        .wrap("<div class='" + backgroundClass + "'>");
    // 隐藏背景
    $("." + backgroundClass).hide();
    // 显示前景
    return $("<div>")
        .addClass("d-block w-100 " + foregroundClass)
        .attr("data-style", "no-support")
        .css("height", window.innerHeight + "px")
        .css("background", "rgba(0, 0, 0, 0.5)")
        .appendTo("body");
}

function close_new_page(foregroundClass, backgroundClass) {
    let foreground = $("." + foregroundClass);
    let background = $("." + backgroundClass);
    foreground.remove();
    background.show().find(">*").unwrap();
}