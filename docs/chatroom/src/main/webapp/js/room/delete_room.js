function delete_room(user_id, room_id) {
    $.getJSON('delete-room', {
        "type": "delete room",
        "user-id": user_id,
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": room_id
    }, function (data) {
        appendMessage(data);
    });
}