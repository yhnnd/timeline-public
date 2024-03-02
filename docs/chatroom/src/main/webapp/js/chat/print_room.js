// 获取房间已读消息数量
function get_history_room_message_count(room_id) {
    let message_count_list = localStorage.getItem("room-message-count-list");
    let message_count = 0;
    if (message_count_list) {
        message_count_list = JSON.parse(message_count_list);
        message_count = message_count_list["room-" + room_id];
        if (message_count === undefined) message_count = 0;
    }
    return message_count;
}


// 设置房间已读消息数量
function set_history_room_message_count(room_id) {
    let message_count_list = localStorage.getItem("room-message-count-list");
    if (message_count_list) {
        message_count_list = JSON.parse(message_count_list);
    } else {
        message_count_list = {};
    }
    get_room_message_count(room_id, function (count) {
        message_count_list["room-" + room_id] = count;
        message_count_list = JSON.stringify(message_count_list);
        localStorage.setItem("room-message-count-list", message_count_list);
    });
}

function print_room(room) {
    let roomId = room.roomid;
    let row = $(`.row[data-room-id='${roomId}']`).data("room-type", room.type);
    if (row.length > 0) {
        if (room.type === "friends") {
            // 如果是好友房间，房间头像是好友头像，房间名是好友用户名
            get_users_by_roomid(roomId, function (friendList) {
                for (i = 0; i < friendList.length; ++i) {
                    let friend = friendList[i];
                    if (friend.userid !== parseInt(sessionStorage.getItem("user-id"))) {
                        get_user_by_userid(friend.userid, function (user) {
                            $(row).find(".room-name").text(user.username)
                                .append('<small class="ml-1 text-muted nickname-field">(<span class="nickname"></span>)</small>');
                            let avatar = $(row).find(".room-avatar");
                            if (user.avatar) {// 好友有头像
                                avatar.attr("src", user.avatar)
                                    .on("error", function () {// 好友头像已失效
                                        $(this).replaceWith('<i class="fa fa-2x fa-user-circle">');
                                    });
                            } else {// 好友没有头像
                                $(avatar).replaceWith('<i class="fa fa-2x fa-question-circle">');
                            }
                            get_user_and_room_by_friendid(friend.userid, function (d) {
                                let nickname = d.nickname;
                                if (nickname && nickname.length) {
                                    $(row).find(".nickname").text(nickname);
                                } else {
                                    $(row).find(".nickname-field").hide().find(".nickname").text("null");
                                }
                            });
                        });
                        break;
                    }
                }
            });
        } else {// 房间不是好友房间
            $(row).find('.room-avatar').replaceWith("<i class='fa fa-2x fa-home'></i>");
            $(row).find('.room-name').text(room["name"]);
        }
        get_room_message_count(roomId, function (total_message_count) {
            // 求出未读消息数量
            let history_message_count = get_history_room_message_count(roomId);
            let unread_message_count = total_message_count - history_message_count;
            let message_count_field = $(row).find('.room-message-count');
            if (get_room_notification_popup(roomId) === 1) {// 如果新消息弹窗已开启
                $(row).addClass("alert-info");
            }
            if (get_room_notification(roomId) === 1) {// 如果新消息提示已开启
                if (unread_message_count > 0) {// 如果房间有未读消息
                    message_count_field.empty()
                        .append('<span class="badge badge-pill badge-danger">' + unread_message_count + '</span>');
                } else if (total_message_count > 0) {// 如果房间消息总数大于零
                    message_count_field.empty()
                        .append('<span class="badge badge-pill badge-info">' + total_message_count + '</span>');
                }
            }
        });
    } else {
        throw new Error("print_room() room not found");
    }
}