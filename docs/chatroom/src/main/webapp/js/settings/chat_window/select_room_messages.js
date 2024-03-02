// 返回选中消息数量和消息总数
function get_select_room_messages_count() {
    let messageWindow = $("#message-window");
    let messageField = messageWindow.find("#messages");
    let checkboxes = messageField.find(".select-message-checkbox");
    let checkboxesSelectedCount = checkboxes.find(".fa-check-circle").length;
    let checkboxesTotalCount = checkboxes.length;
    return {
        "selected": checkboxesSelectedCount,
        "total": checkboxesTotalCount
    };
}

// 显示选中消息数量和消息总数
function refresh_select_room_messages_count() {
    let count = get_select_room_messages_count();
    let selectMessagesToolbar = $("#select-room-messages-toolbar");
    selectMessagesToolbar.find('#select-room-messages-count-selected').html(count.selected);
    selectMessagesToolbar.find('#select-room-messages-count-total').html(count.total);
}

// 开始选择多条消息
function init_select_room_messages() {
    let messageWindow = $("#message-window");
    let messageField = messageWindow.find("#messages");
    let messages = messageField.find(">h5");
    // 删除消息窗口中第一条消息之前的所有内容
    messages.first().prevAll().remove();
    // 在每条消息（除第一条外）之前添加复选框
    messages.each(function (index, elem) {
        if (index === 0) {// 如果是第一条消息
        } else if ($(this).prev().is(".select-message-checkbox")) {// 如果消息之前相邻的兄弟是复选框
            $(this).prev().show();// 显示消息之前的复选框
        } else {// 在消息之前添加复选框
            $(this).before(
                "<span class='select-message-checkbox' style='position: relative;'>" +
                "<i class='fa fa-3x fa-circle-o text-muted' style='position:absolute;top:2.5rem;opacity: 0.5;'></i>" +
                "</span>");
            let message_user_id = $(this).find("[data-user-id]").data("user-id");// 获取消息的用户 ID
            if (message_user_id && message_user_id == sessionStorage.getItem("user-id")) {// 如果消息是我发的
                let right = "calc(-" + messageWindow.css("width") + " + 0.5rem" + ")";
                $(this).prev().find("i.fa").css("right", right);
            } else {// 如果消息是别人发的
                $(this).prev().find("i.fa").css("left", "-2rem");
            }
        }
    });
    // 监听复选框点击事件
    let checkboxes = messageField.find(".select-message-checkbox");
    checkboxes.find(">i.fa").off("click").on("click", function () {
        if ($(this).hasClass("fa-circle-o")) {
            $(this).removeClass("fa-circle-o text-muted").addClass("fa-check-circle text-primary").css("opacity", "1");
        } else {
            $(this).removeClass("fa-check-circle text-primary").addClass("fa-circle-o text-muted").css("opacity", "0.5");
        }
        refresh_select_room_messages_count();
    });
    // 操作选中消息的工具栏
    let selectMessagesToolbar = $(
        "<span id='select-room-messages-toolbar'>" +
        "   <small id='select-room-messages-count-selected'></small>/<small id='select-room-messages-count-total'></small>" +
        "   <i id='button-delete-messages' class='fa fa-trash-o ml-1 mr-2 mt-2 align-self-center'></i>" +
        "</span>");
    // 监听工具栏中删除按钮的点击事件
    selectMessagesToolbar.find("#button-delete-messages").on("click", confirm_delete_selected_messages);
    // 删除操作选中消息的工具栏
    $("#room-name #select-room-messages-toolbar").remove();
    // 获取触发选择多条消息的按钮
    let toggleSelect = $("#room-name #toggle-select-messages");
    // 在该按钮之前添加工具栏
    toggleSelect.before(selectMessagesToolbar);
    // 显示选中消息的数量和消息总数
    refresh_select_room_messages_count();
}

// 退出选择多条消息
function cancel_select_room_messages() {
    let messageWindow = $("#message-window");
    let messageField = messageWindow.find("#messages");
    messageField.find(".select-message-checkbox").hide();
    $("#room-name #select-room-messages-toolbar").remove();
}

// 完全退出选择多条消息
function quit_select_room_messages() {
    let messageWindow = $("#message-window");
    let messageField = messageWindow.find("#messages");
    messageField.find(".select-message-checkbox").remove();
    $("#room-name #select-room-messages-toolbar").remove();
}

// 重新初始化选择多条消息
function reset_select_room_messages(callback) {
    quit_select_room_messages();
    init_select_room_messages();
    callback && callback();
}

// 撤回选中的多条消息（如果消息不是自己发的就删除）
function delete_selected_messages() {
    let messageWindow = $("#message-window");
    let messageField = messageWindow.find("#messages");
    let checkboxes = messageField.find(".select-message-checkbox");
    let checkboxesSelected = checkboxes.find(".fa-check-circle").parent();
    if (checkboxesSelected.length > 0) {
        let reset_select_room_messages_callback = function () {
            appendModal("bg-primary text-white", "text-primary", "System Message", "Messages Deleted", "");
        };
        for (let i = 0; i < checkboxesSelected.length; ++i) {
            let messageBody = checkboxesSelected.eq(i).next();
            let message_id = messageBody.find("[data-message-id]").data("message-id");
            let user_id = messageBody.find("[data-user-id]").data("user-id");
            if (message_id && user_id && user_id == sessionStorage.getItem("user-id")) {
                withdraw_message(message_id, function (data) {
                    if (i === checkboxesSelected.length - 1) {
                        reset_select_room_messages(reset_select_room_messages_callback);
                    }
                });
            } else {
                messageBody.remove();
                if (i === checkboxesSelected.length - 1) {
                    reset_select_room_messages(reset_select_room_messages_callback);
                }
            }
        }
    }
}

// 询问是否删除选中的多条消息
function confirm_delete_selected_messages() {
    if (get_select_room_messages_count().selected > 0) {
        let ModalBody =
            "<p>Do you really want to delete these messages ?</p>" +
            "<div class='card card-block card-outline-danger p-2 mb-3' style='border-radius: 0;'>" +
            "   <small><var>Messages sent by you will be recalled and messages sent by others will be deleted from your chat history.</var></small>" +
            "   <small><var>Notice that recalled messages</var> <u><strong>WILL NOT</strong></u> <var>be recovered.</var></small>" +
            "</div>" +
            "<div class='btn-group mb-2 w-100 text-center'>" +
            "   <div class='btn btn-outline-danger w-75' onclick='delete_selected_messages()'>Delete Messages Selected</div>" +
            "   <div class='btn btn-outline-primary w-25' data-dismiss='modal'>Cancel</div>" +
            "</div>";
        appendModal("bg-danger text-white", "alert-danger text-danger", "Warning", ModalBody, "", false);
    } else {
        let ModalBody = "Please Select At Least One Message Before Clicking Delete Button";
        appendModal("bg-danger text-white", "alert-warning text-danger", "System Message", ModalBody, "");
    }
}