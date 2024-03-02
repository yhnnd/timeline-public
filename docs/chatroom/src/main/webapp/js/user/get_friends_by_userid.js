function get_friends_by_userid(userid, callback) {
    let args = arguments;
    $.getJSON("friends", {
        "user-id": userid
    }, function (data) {
        log.line({
            title: "get_friends_by_userid()",
            filename: "user/get_friends_by_userid.js",
            name: "jQuery getJSON 'friends' callback data",
            text: [JSON.stringify(args), JSON.stringify(data)]
        });
        callback && callback(userid, data);
    });
}

function get_friends_by_userid_callback(userid, data) {
    // 收到服务器 FriendService 发来的好友数组
    let friendList = data;

    // 获取用户好友列表区域
    let friendListTable = $("#friend-list table > tbody");
    let IncomingAddFriendListTable = $("#incoming-add-friend-list table > tbody");
    let OutcomingAddFriendListTable = $("#outcoming-add-friend-list table > tbody");
    // 清空用户好友列表
    friendListTable.empty();
    IncomingAddFriendListTable.empty();
    OutcomingAddFriendListTable.empty();
    // 遍历好友数组
    for (let i = 0; i < friendList.length; ++i) {
        let friend = friendList[i];
        if (friend === null) continue;
        // 如果好友列表上没有当前好友，且好友 id 和当前用户 id 不一样。注：!= 不能写作 !==
        if ($('[data-friend-id="' + friend.userid + '"]').length == 0 && friend.userid != userid) {
            // 添加到用户的好友列表中
            friendListTable.append(
                '<tr data-friend-id="' + friend.userid + '">' +
                '<th scope="row">' +
                (friend.avatar ?
                    `<img class="rounded-circle" style="width:1.5rem;height:1.5rem;" src="${friend.avatar}">` :
                    '<span class="fa fa-user-circle-o fa-lg"></span>') +
                '</th>' +
                '<td>' + friend.username + '</td>' +
                '<td>' + friend.gender + '</td>' +
                '<td>' +
                '   <span class="btn btn-sm btn-primary btn-chat">' +
                '       <span class="fa fa-comments"></span>' +
                '   </span>' +
                '   <span class="btn btn-sm btn-primary btn-friend-info">' +
                '       <span class="fa fa-info"></span>' +
                '   </span>' +
                '</td>' +
                '</tr>');
            // 获取好友房间联系数据，若未加好友，分到未加好友区域
            get_user_and_room_by_friendid(friend.userid, function (data) {
                if (data["status-code"] == 2) {
                    // 好友已发送加好友请求，自己已收到加好友请求
                    let row = $("tr[data-friend-id='" + data.userid + "']");
                    // 将此好友添加到已收到加好友请求列表中
                    IncomingAddFriendListTable.append(row);
                    // 绑定点击事件
                    $(IncomingAddFriendListTable).find('tr[data-friend-id]>td').off('click').on('click', function (event) {
                        event.preventDefault();
                        // 设置对话框标题
                        let ModalTitle = "<span data-chinese='同意添加好友请求'>Accept Add Friend Request</span>";
                        // 设置对话框内容
                        let ModalBody = "<p data-chinese='你希望添加此用户到你的好友列表吗？'>do you want to add this user to your friend list?</p>"
                            + "<div class='btn-group float-right'>"
                            + "<div class='btn btn-outline-primary' id='accept-add-friend-button'"
                            + " data-friend-id='" + $(this).parent().data("friend-id") + "' data-chinese='接受'> Accept </div>"
                            + "<div class='btn btn-outline-danger' data-dismiss='modal' data-chinese='取消'> Cancel </div>"
                            + "</div>";
                        // 显示对话框
                        appendModal("bg-primary text-white", "text-primary", ModalTitle, ModalBody, "", false);
                        refresh_system_language(".modal");
                        // 为接受按钮的点击事件绑定函数
                        $('#accept-add-friend-button').on("click", function () {
                            add_friend_accept(sessionStorage.getItem("user-id"), $(this).data("friend-id"));
                        });
                    });
                } else if (data["status-code"] == 6) {
                    // 好友已收到加好友请求，自己已发送加好友请求
                    let row = $("tr[data-friend-id='" + data.userid + "']");
                    // 将此好友添加到已发送加好友请求列表中
                    OutcomingAddFriendListTable.append(row);
                    // 取消绑定点击事件
                    $(OutcomingAddFriendListTable).find('tr[data-friend-id]>td').off('click');
                }
            });
        }
    }
    // 点击 tr 中的 th 可以查看好友房间信息
    $(friendListTable).find('tr[data-friend-id]>td>.btn.btn-friend-info').on('click', function (event) {
        event.preventDefault();
        get_room_by_friendid($(this).parent().parent().data("friend-id"), get_room_by_friendid_callback);
    });
    // 点击 tr 中的 td 可以进入好友房间
    $(friendListTable).find('tr[data-friend-id]>td>.btn.btn-chat').on('click', function (event) {
        event.preventDefault();
        get_room_by_friendid($(this).parent().parent().data("friend-id"), function (data) {
            gotoRoom(data.roomid);
        })
    });
}