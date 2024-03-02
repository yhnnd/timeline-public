// 返回所有房间的新消息弹窗（数组）
function get_room_notification_popup_list() {
    let room_notification_list = localStorage.getItem("room-notification-popup");
    if (room_notification_list) {
        room_notification_list = JSON.parse(room_notification_list);
    }
    if (!room_notification_list) {
        room_notification_list = {};
    }
    return room_notification_list;
}

// 开启或关闭 room-id 对应的房间的新消息弹窗
function set_room_notification_popup(roomid, value) {
    let room_notification_list = get_room_notification_popup_list();
    room_notification_list["room-" + roomid] = value;
    localStorage.setItem("room-notification-popup", JSON.stringify(room_notification_list));
    // 刷新消息列表
    get_rooms_by_userid(sessionStorage.getItem("user-id"),print_rooms);
}

// 返回 room-id 对应的房间的新消息弹窗是否开启，如果未查到，设置为开启
function get_room_notification_popup(roomid) {
    let room_notification_list = get_room_notification_popup_list();
    let value = room_notification_list["room-" + roomid];
    if (value !== 0 && value !== 1) {
        value = 1;
        room_notification_list["room-" + roomid] = 1;
        localStorage.setItem("room-notification-popup", JSON.stringify(room_notification_list));
    }
    return value;
}

function enable_room_notification_popup(roomid) {
    set_room_notification_popup(roomid, 1);
}

function disable_room_notification_popup(roomid) {
    set_room_notification_popup(roomid, 0);
}