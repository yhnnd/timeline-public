function refresh_user() {
    $('#new-password').val('').attr('placeholder', 'input new password');
    $('#confirm-new-password').val('').attr('placeholder', 'confirm new password');
    get_user_by_userid(sessionStorage.getItem("user-id"), function (user) {
        $('#new-username').val(user.username);
        $("#user-avatar").attr("src", user.avatar);
        $('select#new-gender>option').removeAttr("selected");
        if (user.gender) {
            $('select#new-gender').val(user.gender);
            $(`select#new-gender>option[value="${user.gender}"]`).attr("selected", true);
        } else {
            $('select#new-gender').val("unknown");
            $('select#new-gender>option[value="unknown"]').attr("selected", true);
        }
    });
}