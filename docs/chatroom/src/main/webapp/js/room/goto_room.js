// 选择并进入聊天室
function gotoRoom(room_id, callback) {
    add_loading_icon();
    selectRoomId(room_id, function () {
        // 加载页面标题栏
        init_page_header(room_id);
        // 显示聊天窗口 tab
        $('[data-toggle="tab"][href="#chat"]').parent().show();
        // 进入聊天窗口 tab-pane
        $('[data-toggle="tab"][href="#chat"]').click();
        // 滚动到聊天记录底部
        $('#messages h5:last').get(0).scrollIntoView();
        // 设置房间已读消息数量
        set_history_room_message_count(room_id);
        // 设置房间未读消息数量
        set_unread_message_count(0);
        // 当页面滚动到底部时，隐藏未读消息提示
        $(window).off('scroll').on('scroll', function () {
            if ($(document).height() === $(window).height() + $(window).scrollTop()) {
                set_unread_message_count(0);
            }
        });
        remove_loading_icon();
        // 加载完消息窗口之后，执行回调函数
        callback && callback();
    });
}