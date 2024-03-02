function delete_card_submit(card_id) {
    $.post("delete-card", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "card-id": card_id
    }, function (data) {
        refresh_cards();
        let resultMessage = JSON.parse(data);
        if (resultMessage.result === 1) {
            appendModal("bg-primary text-white", "text-primary", "System Message", "card deleted", "");
        } else {
            appendModal("bg-danger text-white", "text-danger", "Error Message", "delete card failed", "");
        }
    });
}

function delete_card(card_id) {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    let ModalBody = "<p><b>do you really want to delete this card ?</b></p>" +
        "<blockquote class='ml-2 alert-warning'>" +
        "   <p class='mb-0'><i class='fa fa-warning'></i> <strong>Warning</strong></p>" +
        "   <p class='mb-2'>Deleted card <b class='text-uppercase'>will not</b> be recovered.</p>" +
        "   <small class='d-block mb-1 text-muted'><var>If you want to hide the card from others, you can hide your cards by setting the card to <b>private card</b>.</var></small>" +
        "   <small class='d-block mb-1 text-muted'><u>learn more about <b>private card</b></u></small>" +
        "</blockquote>" +
        "<div class='btn-group float-right'>" +
        "<div class='btn btn-outline-danger' id='delete-card-button' data-chinese='确认删除卡片'> Delete Anyway </div>" +
        "<div class='btn btn-outline-primary' data-dismiss='modal' data-chinese='取消'> Cancel </div>" +
        "</div>";
    // 显示对话框
    appendModal("bg-danger text-white", "alert-warning text-danger", "Delete Card", ModalBody, "", false);
    change_system_language(localStorage.getItem("application-language"));
    // 为删除卡片按钮的点击事件绑定函数
    $('#delete-card-button').on("click", function () {
        delete_card_submit(card_id);
    });
}