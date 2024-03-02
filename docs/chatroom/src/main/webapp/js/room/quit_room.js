function quit_room(userId, room) {
    if (!sessionStorage.getItem("user-id") || !sessionStorage.getItem("session-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
    } else {
        if (confirm(`Warning!\nAre You Sure To Quit Room?\nroom name: "${room.name}"\nroom id: ${room.roomid}`)) {
            quit_room_submit(userId, room.roomid);
        }
    }
}

function quit_room_submit(userId, roomId) {
    $.getJSON('quit-room', {
        "user-id": userId,
        "room-id": roomId,
        "type": "quit room"
    }, function (data) {
        appendMessage(data);
    });
}