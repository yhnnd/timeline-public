function append_message_login(data) {
    if (data.user) {
        let username = data.user.username;
        let userId = data.user.userid;
        if (username && userId) {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("user-id", userId);
            sessionStorage.setItem("user-role", data.user.role);
            sessionStorage.setItem("session-id", data["session-id"]);
            // 获取用户所有房间
            get_rooms_by_userid(userId, function (rooms) {
                get_rooms_by_userid_callback(rooms);
                print_rooms(rooms);
            });
            // 获取所有我管理的房间的加入请求
            get_join_room_requests_of_rooms_in_which_i_am_admin(userId, function (data) {
                print_join_rooms_requests_of_rooms_in_which_i_am_admin(data);
            });
            // 获取用户所有好友
            get_friends_by_userid(userId, get_friends_by_userid_callback);
            // 获取用户所有卡片
            init_cards(userId, init_cards_callback);
            // 显示用户信息
            refresh_user();
            // 加载高级设置
            init_advanced_settings();
            // 加载首选项
            init_preferences(userId);
            // 加载用户自己发送的消息的样式
            init_my_message_style();
            // 如果用戶身份是管理員, 顯示控制臺
            if (data.user.role === 'sys') {
                $('[data-toggle="tab"][href="#console"]').parent().removeAttr('hidden');
            } else {
                $('[data-toggle="tab"][href="#console"]').parent().attr('hidden', true);
            }
        } else {
            throw new Error("user-id or username not provided.");
        }
    } else {
        throw new Error("user info not provided.");
    }
}