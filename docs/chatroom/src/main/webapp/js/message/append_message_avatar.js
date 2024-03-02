function append_message_avatar(avatar, data) {
    let userId = data["user-id"];// 头像的用户 ID
    if (userId == 0) {// 如果用户是系统
        avatar.attr("src", "img/avatar-system.jpg");
    } else {
        const userCircle = $(`<i class="fa fa-user-circle ${data['avatar-class']}" style="font-size: 40px;">`);
        const questionCircle = $(`<i class="fa fa-question-circle ${data['avatar-class']}" style="font-size: 40px;">`);
        avatar.off("error").on("error", function () {
            $(this).replaceWith(userCircle);
        });
        let src = localStorage.getItem("avatar-" + userId);// 获取缓存的用户头像
        if (src) {
            avatar.attr("src", src);// 应用缓存的用户头像
        } else if (userId) {// 向服务器获取用户头像
            get_user_by_userid(userId, function (user) {
                if (user.avatar) {// 用户有头像
                    avatar.attr("src", user.avatar);// 加载用户头像
                    localStorage.setItem("avatar-" + userId, user.avatar);// 缓存用户头像
                } else {// 用户未设置过头像
                    avatar.replaceWith(questionCircle);
                }
            });
        }
        // 如果该用户不是用户本人
        if (userId != sessionStorage.getItem("user-id")) {
            // 设置点击用户头像事件的绑定函数
            let func = function () {
                prompt_private_chat(userId);
            };
            avatar.off("click").on("click", func);
            userCircle.off("click").on("click", func);
            questionCircle.off("click").on("click", func);
        }
    }
}