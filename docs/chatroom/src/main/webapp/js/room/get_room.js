// 获取房间号对应的房间
function get_room_by_roomid(roomId, callback) {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    let userId = sessionStorage.getItem("user-id");
    $.getJSON('room', {
        "user-id": userId,
        "room-id": roomId,
        "type": "room"
    }, callback);
}

function get_room_by_roomid_callback(data) {
    let row = $('tr[data-room-id="' + data.roomid + '"]');
    if (row.length > 0) {
        let messageCount = $('<span class="badge badge-pill badge-info float-right mr-2">');
        $(row).find('.room-name').text(data["name"]);
        $(row).find('.room-type').text(data["type"])
            .append(messageCount);
        get_room_message_count(data.roomid, function (count) {
            messageCount.text(count);
        });
    }
}

// 查看房间信息
function room_info() {
    get_room_by_roomid($("#room-id").val(), get_room_by_roomid_callback_room_info);
}

// 获取用户房间关系
function get_user_and_room(userid, roomid, callback) {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    $.getJSON("user-and-room", {
        "user-id": userid,
        "room-id": roomid
    }, callback);
}

// 获取好友 user id 对应的房间
function get_user_and_room_by_friendid(friendid, callback) {
    get_room_by_friendid(friendid, function (data) {
        get_user_and_room(friendid, data.roomid, callback);
    });
}

// 获取当前房间的所有用户
function get_users_by_roomid(roomid, callback) {
    $.getJSON("user-and-rooms", {
        "room-id": roomid
    }, callback);
}