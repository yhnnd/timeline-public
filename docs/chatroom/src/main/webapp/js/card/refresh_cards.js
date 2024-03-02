// 旋转刷新按钮
function refresh_cards_button_rotate() {
    $('#button-refresh-cards').css({
        "transition": "all .5s ease",
        'transform':'rotate(360deg)'
    });
    setTimeout(function() {
        $('#button-refresh-cards').removeAttr("style");
    },500);
}

// 刷新所有卡片
function refresh_cards() {
    // 加载所有卡片
    init_cards(sessionStorage.getItem("user-id"),init_cards_callback);
    // 待加载完所有卡片（刷新按钮也被重新加载了）之后，旋转刷新按钮
    setTimeout(refresh_cards_button_rotate,100);
}