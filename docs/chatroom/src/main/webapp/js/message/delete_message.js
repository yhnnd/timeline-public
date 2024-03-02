// 删除消息（仅 DOM 操作，不删除数据库中的消息）
function delete_message(message_id, temp_id) {
    if (message_id) {
        $('[data-message-id=' + message_id + ']').parent().remove();
    } else if (temp_id) {
        $('[data-temp-id="' + temp_id + '"]').parent().remove();
    }
}