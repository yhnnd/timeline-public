function change_email() {
    let new_email = $("#new-email").val();
    $.post('change/email', {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "new-email": new_email
    }, function (data) {
        refresh_user();
        appendMessage(JSON.parse(data));
    });
}