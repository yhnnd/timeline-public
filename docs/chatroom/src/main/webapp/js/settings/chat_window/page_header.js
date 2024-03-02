function init_page_header(room_id) {
    // 加载聊天室名称
    let roomName = $('.row[data-room-id="' + room_id + '"] .room-name').text();
    // 获取聊天室类型和消息数量
    let roomTypeField = $('tr[data-room-id="' + room_id + '"] .room-type').clone();
    // 删掉聊天室消息数量
    roomTypeField.find(':nth-child(n)').remove();
    // 加载聊天室类型
    let roomType = roomTypeField.text();
    $('#room-info')
        .text(roomName)
        .attr('data-content', "room-id: " + room_id + ", room-type: " + roomType);
    let roomNameField = $("#room-name");
    // 生成通知工具栏
    let notifications =
        "<span class='d-inline-block float-right' id='room-notifications'>" +
        "   <i class='fa fa-circle-o mx-2 mt-2 align-self-center text-muted' id='toggle-select-messages' style='opacity: 0.5;cursor:pointer;'></i>" +
        "   <span id='toggle-room-popup' style='cursor: pointer;'>" +
        ( get_room_notification_popup(room_id) === 1 ?
            "   <i class='fa fa-window-maximize mx-2 mt-2 align-self-center text-gray-dark' style='opacity: 1;'></i>" :
            "   <i class='fa fa-window-maximize mx-2 mt-2 align-self-center text-muted' style='opacity: 0.5;'></i>") +
        "   </span>" +
        "   <span id='toggle-room-notification' style='cursor:pointer;'>" +
        ( get_room_notification(room_id) === 1 ?
            "   <i class='fa fa-bell-o mx-2 mt-2 align-self-center' style='opacity: 1;'></i>" :
            "   <i class='fa fa-bell-slash-o mx-2 mt-2 align-self-center' style='opacity: 0.5;'></i>") +
        "   </span>" +
        "   <small id='room-message-count'>" +
        `       <span class='badge badge-pill badge-info mx-2 mt-2' id='message-count-${room_id}'>` +
        "       </span>" +
        "   </small>" +
        "</span>";
    // 获取聊天室消息总数
    get_room_message_count(room_id, function (count) {
        $('#message-count-' + room_id).text(count);
    });
    // 删除通知工具栏
    roomNameField.find("#room-notifications").remove();
    // 添加通知工具栏
    roomNameField.append(notifications);
    // 激活选择多条消息的按钮
    roomNameField.find("#toggle-select-messages").off("click").on("click", function () {
        if ($(this).hasClass("text-muted")) {// 开始选择多条消息
            init_select_room_messages();
            $(this).removeClass("fa-circle-o text-muted").addClass("fa-check-circle-o text-gray-dark").css("opacity", "1");
        } else {// 退出选择多条消息
            cancel_select_room_messages();
            $(this).removeClass("fa-check-circle-o text-gray-dark").addClass("fa-circle-o text-muted").css("opacity", "0.5");
        }
    });
    // 激活控制新消息弹窗的按钮
    roomNameField.find("#toggle-room-popup>i.fa").off("click").on("click", function () {
        if ($(this).hasClass("text-gray-dark")) {// 关闭新消息弹窗
            disable_room_notification_popup(room_id);
            $(this).removeClass("text-gray-dark").addClass("text-muted").css("opacity", "0.5");
        } else {// 开启新消息弹窗
            enable_room_notification_popup(room_id);
            $(this).removeClass("text-muted").addClass("text-gray-dark").css("opacity", "1");
        }
    });
    // 激活控制新消息数量提醒的按钮
    roomNameField.find("#toggle-room-notification>i.fa").off("click").on("click", function () {
        if ($(this).hasClass("fa-bell-o")) {// 关闭新消息提醒
            disable_room_notification(room_id);
            $(this).removeClass("fa-bell-o").addClass("fa-bell-slash-o").css("opacity", "0.5");
        } else {// 开启新消息提醒
            enable_room_notification(room_id);
            $(this).removeClass("fa-bell-slash-o").addClass("fa-bell-o").css("opacity", "1");
        }
    });
}