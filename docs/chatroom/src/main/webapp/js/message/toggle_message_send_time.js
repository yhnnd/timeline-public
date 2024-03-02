function toggle_message_send_time(messageText) {
    // 获取消息发送时间显示区域
    let messageSendTime = $(messageText).siblings(".message-send-time");
    // 如果没有消息发送时间显示区域，就添加消息发送时间显示区域
    if (messageSendTime.length === 0) {
        messageSendTime = $('<div class="collapse message-send-time text-muted">');
        $('<small>').html($(messageText).data('send-time')).appendTo(messageSendTime);
        $(messageText).parent().append(messageSendTime);
    }
    $(messageSendTime).collapse("toggle");
}