// 登出账户函数
function logout() {
    let user_id = sessionStorage.getItem("user-id");
    let session_id = sessionStorage.getItem("session-id");
    if (user_id && session_id) {
        add_loading_icon();// remove_loading_icon() in append_message_system()
        websocket.send(JSON.stringify({
            "user-id": user_id,
            "session-id": session_id,
            "type": "logout"
        }));
    }
    sessionStorage.clear();// 清除会话信息（user-id 和 session-id）
    let autoLogin = $('#auto-login').is(":checked");
    if (!autoLogin) clearCache();// 清除本地缓存（用户登录信息以及个性化设置）
}