function room_manager(roomId, userId, action, callback) {
    $.getJSON("room-manager", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": roomId,
        "room-user-id": userId,
        "action": action
    }, callback);
}

function get_room_manager(roomId, userId, callback) {
    room_manager(roomId, userId, "get", callback);
}

function add_room_manager(roomId, userId, callback) {
    room_manager(roomId, userId, "add", callback);
}

function remove_room_manager(roomId, userId, callback) {
    room_manager(roomId, userId, "remove", callback);
}

function set_room_manager_privilege(roomId, userId, privilege, callback) {
    $.post("room-manager", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": roomId,
        "room-user-id": userId,
        "action": "set",
        "privilege-name": privilege["name"],
        "privilege-value": privilege["value"],
        "privilege-value-type": privilege["value-type"]
    }, function (text) {
        callback(JSON.parse(text));
    });
}