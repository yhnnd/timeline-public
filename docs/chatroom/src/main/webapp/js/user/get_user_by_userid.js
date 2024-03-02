// 从 UserServlet 获取用户信息
function get_user_by_userid(userid, callback) {
    if (!userid) throw error("user-id undefined");
    $.getJSON("user", {
        "user-id": userid
    }, callback);
}