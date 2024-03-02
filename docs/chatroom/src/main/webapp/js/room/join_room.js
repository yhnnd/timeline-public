function join_room(userid, roomid) {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    $.getJSON('join-room', {
        "user-id": userid,
        "room-id": roomid,
        "type": "join room"
    }, function (data) {
        appendMessage(data);
    });
}

function search_room_callback_join_room() {
    if ($("#search-room-confirm").hasClass("btn-outline-primary") === false) {
        return;
    }
    let userid = sessionStorage.getItem("user-id");
    if ($("#search-room-by-name").hasClass("active")) {
        let ResultRoomId = $("#search-room-results-field .room-id");
        if (ResultRoomId.length > 0) {
            let roomid = parseInt(ResultRoomId.text());
            join_room(userid, roomid);
        }
    } else if ($("#search-room-by-roomid").hasClass("active")) {
        let InputRoomId = $("#roomid-to-search");
        let ResultRoomName = $("#search-room-results-field .room-name");
        if (ResultRoomName.length > 0) {
            let roomid = InputRoomId.val();
            join_room(userid, roomid);
        }
    }
}