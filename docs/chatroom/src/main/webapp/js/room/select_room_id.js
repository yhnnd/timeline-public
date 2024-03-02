// 选择聊天室
function selectRoomId(room_id, callback) {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    let room_id_input = $('#room-id');
    $(room_id_input)
        .val(room_id)
        .attr('value', room_id)
        .attr('data-room-id', room_id);
    // 不能用 !==
    if ($(room_id_input).val() != room_id) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "Room Not Available Now");
    } else {
        // 加载聊天室所有消息
        get_room_messages(room_id, 10, callback);
    }
}