function change_age() {
    let new_age = $("#new-age").val();
    $.post('change/age', {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "new-age": new_age
    }, function (data) {
        refresh_user();
        appendMessage(JSON.parse(data));
    });
}