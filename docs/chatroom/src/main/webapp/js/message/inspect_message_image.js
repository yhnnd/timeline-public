function inspect_message_image(img) {
    // 初始化图片区域
    let field = $("<div>")
        .addClass("d-block w-100 d-flex align-items-center justify-content-center")
        .css({height: "100%"});
    // 初始化图片
    $("<img>")
        .addClass('img-fluid')
        .attr("src", img.attr("src"))
        .appendTo(field);
    // 初始化前景
    let foreground = $("<div>")
        .addClass("fixed-top d-block w-100 check-message-image-foreground")
        .attr({"data-style": "no-support"})
        .css({height: window.innerHeight + "px"})
        .on("click", quit_inspect_message_image)
        .append(field);
    // 初始化背景
    let background = $("<div>")
        .addClass("fixed-top d-block w-100 check-message-image-background")
        .attr({"data-style": "no-support"})
        .css({
            height: window.innerHeight + "px",
            background: `url(${img.attr("src")})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "scroll",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            filter: "brightness(0.15)"
        });
    $("body")
        .append(background)
        .append(foreground);
}

function quit_inspect_message_image() {
    $(".check-message-image-foreground").remove();
    $(".check-message-image-background").remove();
}