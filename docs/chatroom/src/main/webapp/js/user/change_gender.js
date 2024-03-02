function change_gender() {
    let new_gender = $("#new-gender").val();
    $.post('change/gender', {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "new-gender": new_gender
    }, function (data) {
        refresh_user();
        appendMessage(JSON.parse(data));
    });
}