function update_room(roomid, valueName, value) {
    let formData = {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": roomid
    };
    formData[valueName] = value;
    $.post("room-update", formData, function (result) {
        console.log("update_room(" + roomid + "," + valueName + "," + value + ") room = " + result);
        let data = JSON.parse(result);
        if (data) {
            get_room_by_roomid(data.roomid, get_room_by_roomid_callback_room_info);
        } else {
            console.log("update room failed");
        }
    });
}

function change_room_name(roomid) {
    let roomName = $('#new-room-name').val();
    update_room(roomid, "room-name", roomName);
}

function change_room_type(roomid) {
    let roomType = $('#new-room-type').val();
    update_room(roomid, "room-type", roomType);
}

function change_room_live(roomid) {
    let roomLive = $('#new-room-live').val();
    update_room(roomid, "room-live", roomLive);
}