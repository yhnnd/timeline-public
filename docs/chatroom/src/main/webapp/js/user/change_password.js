function change_password() {
    if ($("#new-password").val() == $("#confirm-new-password").val()) {
        $.post('change/password', {
            "user-id": sessionStorage.getItem("user-id"),
            "session-id": sessionStorage.getItem("session-id"),
            "new-password": $("#new-password").val()
        }, function (data) {
            let message = JSON.parse(data);
            $("#new-password,#confirm-new-password").attr("placeholder", message["message"]).val("");
            appendMessage(message);
        });
    } else {
        $("#new-password").attr("placeholder", "password and its checking").val("");
        $("#confirm-new-password").attr("placeholder", "must be identical").val("");
    }
}