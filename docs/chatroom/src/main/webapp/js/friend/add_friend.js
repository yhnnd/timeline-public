function add_friend(userid,friendID) {
    if(!sessionStorage.getItem("user-id")){
        appendModal("bg-danger text-white","text-danger","Warning","please log in first");
        return;
    }
    $.getJSON('add-friend',{
        "user-id": userid,
        "friend-id": friendID,
        "type": "add friend"
    },function (data) {
        appendMessage(data);
    });
}