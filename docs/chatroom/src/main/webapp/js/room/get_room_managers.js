function get_room_managers(roomid, callback) {
    $.getJSON("room-managers", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": roomid
    }, callback);
}