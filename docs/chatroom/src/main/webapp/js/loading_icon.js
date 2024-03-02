// 显示 "加载中" 图标
function add_loading_icon() {
    // 使背景模糊
    $("body>*")
        .not("script")
        .not(".loading-background")
        .addClass('loading-background');
    // 添加隔层
    $("<div>")
        .addClass("loading-midground w-100 fixed-top")
        .css("height", window.innerHeight + "px")
        .appendTo("body");
    // 添加前景
    $("<div>")
        .addClass("loading-foreground w-100 fixed-top d-flex align-items-center justify-content-center")
        .css("height", window.innerHeight + "px")
        .append("<i class='fa fa-spinner fa-pulse fa-3x fa-fw'>")
        .appendTo("body");
}


// 删除 "加载中" 图标
function remove_loading_icon() {
    $(".loading-background").removeClass("loading-background");
    $(".loading-midground").remove();
    $(".loading-foreground").remove();
}
