// 如果用户当前 roomid 和收到的消息的 roomid 不同，就弹窗提示新消息
function append_message_elsewhere(data) {
    let dataRoomid = data["room-id"];
    $('.modal').modal('hide').remove();
    $('.modal-backdrop').remove();
    let messageModal = $(
        '<div class="modal" id="message-from-elsewhere">' +
        '<div class="modal-dialog modal-lg">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h4 class="modal-title">' +
        '</h4>' +
        '<button type="button" class="close" data-dismiss="modal">' +
        '<span>&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    let roomName = $('.row[data-room-id="' + dataRoomid + '"] .room-name').text();
    messageModal.find('.modal-title').text(roomName);
    messageModal.find('.modal-body').text(data.username + ": " + data.message).on('click', function () {
        $('.modal').modal('hide').remove();
        $('.modal-backdrop').remove();
        gotoRoom(dataRoomid);
    });
    messageModal.modal('show');
}