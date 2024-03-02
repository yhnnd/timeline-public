function refresh_friends() {
    if(!sessionStorage.getItem("user-id")){
        appendModal("bg-danger text-white","text-danger","Warning","please log in first");
        return;
    }
    $('#button-refresh-friends').css({
        "transition": "all .5s ease",
        'transform':'rotate(360deg)'
    });
    setTimeout(function() {
        $('#button-refresh-friends').removeAttr("style");
    },500);
    get_friends_by_userid(sessionStorage.getItem("user-id"),get_friends_by_userid_callback);
}