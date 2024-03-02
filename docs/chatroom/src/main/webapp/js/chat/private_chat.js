function prompt_private_chat(userId) {
    add_loading_icon();
    // 获取当前房间类型
    get_room_by_roomid($("#room-id").val(), function (room) {
        prompt_private_chat_callback(userId, room);
    });
}

function prompt_private_chat_callback(userId, currRoom) {
    // 如果当前房间是好友房间
    if (currRoom && currRoom.type === "friends") {
        get_room_by_roomid($("#room-id").val(), function (room) {
            get_user_by_userid(userId, function (user) {
                remove_loading_icon();
                get_room_user_info(room, user);
            });
        });
    } else {// 如果当前房间不是好友房间
        let timer = setTimeout(function () {
            // 如果当前用户和该用户不是好友
            remove_loading_icon();
            // 设置对话框标题
            let ModalTitle = "<span data-chinese='你和该用户不是好友'>This User is not on Your Contacts</span>";
            // 设置对话框内容
            let ModalBody = "<p data-chinese='发起临时会话？'>start temporary chatting?</p>"
                + "<div class='btn-group float-right'>"
                + "<div class='btn btn-outline-primary' id='accept-add-friend-button'"
                + " data-friend-id='" + userId + "' data-chinese='确认'> Confirm </div>"
                + "<div class='btn btn-outline-danger' data-dismiss='modal' data-chinese='取消'> Cancel </div>"
                + "</div>";
            // 显示对话框
            appendModal("bg-primary text-white", "text-primary", ModalTitle, ModalBody, "");
            refresh_system_language(".modal");
            // 为接受按钮的点击事件绑定函数
            $('#accept-add-friend-button').on("click", function () {
                let ModalTitle = "<span data-chinese='无法发起临时会话'>Unable to Start Temporary Chatting</span>";
                let ModalBody = "<span data-chinese='该功能正在开发中'>This Function is Under Construction.</span>";
                appendModal("bg-danger text-white", "text-danger", ModalTitle, ModalBody, "");
                refresh_system_language(".modal");
            });
        }, 1000);
        get_room_by_friendid(userId, function (data) {
            if (data && data.roomid) {
                // 如果当前用户和该用户是好友
                clearTimeout(timer);
                remove_loading_icon();
                // 获取好友房间号
                let RoomId = data.roomid;
                // 设置对话框标题
                let ModalTitle = "<span data-chinese='你和该用户是好友'>This User is on Your Contacts</span>";
                // 设置对话框内容
                let ModalBody = "<p data-chinese='开始私聊？'>start private chatting?</p>"
                    + "<div class='btn-group float-right'>"
                    + "<div class='btn btn-outline-primary' id='accept-add-friend-button'"
                    + " data-friend-id='" + userId + "' data-chinese='确认'> Confirm </div>"
                    + "<div class='btn btn-outline-danger' data-dismiss='modal' data-chinese='取消'> Cancel </div>"
                    + "</div>";
                // 显示对话框
                appendModal("bg-primary text-white", "text-primary", ModalTitle, ModalBody, "");
                refresh_system_language(".modal");
                // 为接受按钮的点击事件绑定函数
                $('#accept-add-friend-button').on("click", function () {
                    gotoRoom(RoomId);
                });
            }
        });
    }
}