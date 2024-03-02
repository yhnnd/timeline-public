function toggle_scroll_control() {
    let chatField = $('#chat-field');
    let scrollControl = chatField.find('#scroll-control');
    let toggle = chatField.find('#toggle-scroll-control');
    let pageHeader = chatField.find('.page-header');
    let inputWrapper = chatField.find('#send-message-input-group-wrapper');
    // 如果开关是打开的
    if ($(toggle).hasClass('fa-toggle-on')) {
        // 关闭开关
        $(toggle).removeClass('fa-toggle-on').addClass('fa-toggle-off');
        if (localStorage.getItem("allow-toggle-to-hide-scroll-control") == 1) $(scrollControl).removeClass('d-flex').hide();
        if (localStorage.getItem("allow-toggle-to-hide-page-header") == 1) $(pageHeader).hide();
        if (localStorage.getItem("allow-toggle-to-hide-message-input") == 1 && isMobile()) $(inputWrapper).hide();
    } else {
        // 开启开关
        $(toggle).removeClass('fa-toggle-off').addClass('fa-toggle-on');
        $(scrollControl).addClass('d-flex');
        $(pageHeader).show();
        $(inputWrapper).show();
    }
}