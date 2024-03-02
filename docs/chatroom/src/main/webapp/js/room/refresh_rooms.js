function refresh_rooms() {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    $('#button-refresh-rooms').css({
        "transition": "all .5s ease",
        'transform': 'rotate(360deg)'
    });
    setTimeout(function () {
        $('#button-refresh-rooms').removeAttr("style");
    }, 500);
    let userId = sessionStorage.getItem("user-id");
    if (userId) {
        get_rooms_by_userid(userId, get_rooms_by_userid_callback);
        get_join_room_requests_of_rooms_in_which_i_am_admin(userId, print_join_rooms_requests_of_rooms_in_which_i_am_admin);
    }
}