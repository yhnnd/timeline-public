function append_message_room_link(room_id, room_name, button_field_id) {
    // 获取按钮区域
    let button_field = $("#" + button_field_id);
    if (button_field) {
        // 添加进入聊天室和显示原链接的按钮
        button_field.html(
            '<div class="d-block w-100 px-2 pt-2 pb-1">' +
            '   <div class="btn-group w-100">' +
            '   <div class="btn w-75 btn-outline-primary button-join-room">' +
            '       <small class="action" data-chinese="加入">Join</small> ' + room_name +
            '   </div>' +
            '   <div class="btn w-25 btn-primary px-0 collapse-toggle" data-toggle="collapse">' +
            '       <i class="fa fa-link fa-lg"></i>' +
            '   </div>' +
            '</div>' +
            '</div>');
        // 隐藏原链接
        let a = button_field.prev();
        let collapse_id = ("collapse-room-link-" + Math.random()).split(".").join("");
        a.wrap("<div class='collapse' id='" + collapse_id + "'></div>");
        // 激活显示原链接的按钮
        button_field.find(".collapse-toggle").attr("data-target", "#" + collapse_id);
        // 为按钮的点击事件绑定发送加入房间请求函数
        button_field.find('.button-join-room').off("click").on("click", function () {
            let user_id = sessionStorage.getItem("user-id");
            let ModalTitle = "<span data-chinese='确认加入房间'>Confirm Join Room</span>";
            let ModalBody =
                "<p data-chinese='你确认发送加入房间 " + room_name + " 的请求吗？'>Do you want to join in chat room " + room_name + " ?</p>" +
                "<div class='text-center'>" +
                "   <div class='btn btn-block btn-outline-primary' " +
                "   onclick='join_room(" + user_id + "," + room_id + ");'>" +
                "       <span data-chinese='确认加入'>Join Now</span>" +
                "   </div>" +
                "</div>";
            appendModal("bg-primary text-white", "text-primary", ModalTitle, ModalBody, "", false);
            refresh_system_language(".modal");
        });
        // 检查用户是否已经加入聊天室
        get_room_by_roomid(room_id, function (room) {
            // 如果用户已经加入聊天室
            if (room && room.name && room.roomid) {
                // 为按钮的点击事件绑定进入房间函数
                let button = button_field.find('.button-join-room');
                if (button) {
                    button.removeClass("button-join-room")
                        .addClass("button-goto-room")
                        .off("click").on("click", function () {
                        gotoRoom(room_id);
                    }).find(".action").attr({
                        "data-chinese": "进入",
                        "data-english": "Enter"
                    })
                }
            }
        });
        setTimeout(function () {
            refresh_system_language("#messages #" + button_field_id);
        }, 100);
    }
}