function history(userid,roomid) {

}

function search_room_callback_history() {
    if($("#search-room-confirm").hasClass("btn-outline-primary")===false){
        return;
    }
    var userid = sessionStorage.getItem("user-id");
    if($("#search-room-by-name").hasClass("active")){
        var ResultRoomId = $("#search-room-results-field .room-id");
        if(ResultRoomId.length > 0) {
            var roomid = parseInt(ResultRoomId.text());
            history(userid, roomid);
        }
    }else if($("#search-room-by-roomid").hasClass("active")){
        var InputRoomId = $("#roomid-to-search");
        var ResultRoomName = $("#search-room-results-field .room-name");
        if(ResultRoomName.length > 0){
            var roomid = InputRoomId.val();
            history(userid, roomid);
        }
    }
}