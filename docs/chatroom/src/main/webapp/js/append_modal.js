// 如果 ModalClass 未定义，则默认为 "fade"。
// 如果 ModalClick 为 false，则点击弹窗不触发任何事件。
// 如果 ModalClick 未定义，则默认为点击弹窗消失。
function appendModal(HeaderClass, BodyClass, ModalTitle, ModalBody, ModalClass, ModalClick) {
    $('.modal').modal('hide').remove();
    $('.modal-backdrop').remove();
    if (ModalClass === undefined) ModalClass = "fade";
    let messageModal = $(
        '<div class="modal ' + ModalClass + '">' +
        '<div class="modal-dialog modal-lg">' +
        '<div class="modal-content">' +
        '<div class="modal-header ' + HeaderClass + '">' +
        '<h4 class="modal-title">' +
        '</h4>' +
        '<button type="button" class="close" data-dismiss="modal">' +
        '<span>&times;</span>' +
        '</button>' +
        '</div>' +
        '<div class="modal-body ' + BodyClass + '">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    messageModal.find('.modal-title').html(ModalTitle);
    messageModal.find('.modal-body').html(ModalBody);
    if (ModalClick === undefined) {
        messageModal.find('.modal-body').on('click', function () {
            $('.modal').modal('hide').remove();
            $('.modal-backdrop').remove();
        });
    } else if (ModalClick === false) {
        // do nothing
    } else {
        messageModal.find('.modal-body').on('click', ModalClick);
    }
    messageModal.modal('show');
}