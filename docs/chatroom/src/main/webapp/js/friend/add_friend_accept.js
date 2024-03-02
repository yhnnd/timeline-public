function add_friend_accept(userid, friendID) {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    $.getJSON('add-friend-accept', {
        "user-id": userid,
        "friend-id": friendID,
        "type": "add friend accept"
    }, function (data) {
        appendMessage(data);
    });
}