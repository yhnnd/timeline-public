// 返回所有房间的新消息提醒（数组）
function get_room_notification_list() {
    let room_notification_list = localStorage.getItem("room-notification");
    if (room_notification_list) {
        room_notification_list = JSON.parse(room_notification_list);
    }
    if (!room_notification_list) {
        room_notification_list = {};
    }
    return room_notification_list;
}

// 开启或关闭 room-id 对应的房间的新消息提醒
function set_room_notification(roomid, value) {
    let room_notification_list = get_room_notification_list();
    room_notification_list["room-" + roomid] = value;
    localStorage.setItem("room-notification", JSON.stringify(room_notification_list));
    // 刷新消息列表
    get_rooms_by_userid(sessionStorage.getItem("user-id"),print_rooms);
}

// 返回 room-id 对应的房间的新消息提醒是否开启，如果未查到，设置为开启
function get_room_notification(roomid) {
    let room_notification_list = get_room_notification_list();
    let value = room_notification_list["room-" + roomid];
    if (value !== 0 && value !== 1) {
        value = 1;
        room_notification_list["room-" + roomid] = 1;
        localStorage.setItem("room-notification", JSON.stringify(room_notification_list));
    }
    return value;
}

function enable_room_notification(roomid) {
    set_room_notification(roomid, 1);
}

function disable_room_notification(roomid) {
    set_room_notification(roomid, 0);
}