function change_username() {
    let new_username = $("#new-username").val();
    get_user_by_userid(sessionStorage.getItem("user-id"),function (user) {
        if(user.username != new_username){
            change_username_submit(new_username);
        }
    })
}

function change_username_submit(username) {
    $.post('change/username',{
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "new-username": username
    },function (data) {
        refresh_user();
        appendMessage(JSON.parse(data));
    });
}