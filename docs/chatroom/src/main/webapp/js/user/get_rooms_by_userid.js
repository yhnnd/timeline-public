// 获取当前用户的所有房间号
function get_rooms_by_userid(userid, callback) {
    $.getJSON("user-and-rooms", {
        "user-id": userid
    }, function (data) {
        log.line({
            title: "get_rooms_by_userid()",
            filename: "user/get_rooms_by_userid.js",
            name: "jQuery getJSON 'user-and-rooms' callback data",
            text: JSON.stringify(data)
        });
        callback && callback(data);
    });
}

// 输出用户的房间列表
function get_rooms_by_userid_callback(data) {
    // 收到服务器 RoomService 发来的用户房间数组
    let userAndRoomList = data;
    // 提取所有房间号，添加到用户的房间列表中
    let RoomTable = $("#room-list table > tbody").empty();
    let RoomNotPermitted = $("#room-not-permitted-list table > tbody").empty();
    let RoomWaitingForMyPermission = $("#room-waiting-for-my-permission table > tbody").empty();
    for (let i = 0; i < userAndRoomList.length; ++i) {
        let status = parseInt(userAndRoomList[i]["status-code"]);
        let roomId = userAndRoomList[i]["roomid"];
        // 2019年4月11日星期四
        // status   meaning                 status   meaning
        // 1        已发送，被屏蔽             5        已收到，已屏蔽
        // 2        已发送，待回复             6        已收到，未回复
        // 3        已发送，被拒绝             7        已收到，已拒绝
        // 4        已发送，被接受             8        已收到，已接受
        if ([4, 8].includes(status)) {
            RoomTable.append(
                '<tr data-room-id="' + roomId + '" onselectstart="return false;">' +
                '<th scope="row">' + roomId + '</th>' +
                '<td class="room-name"></td>' +
                '<td class="room-type"></td>' +
                '<td>' +
                '   <span class="btn btn-sm btn-primary btn-chat">' +
                '       <span class="fa fa-comments"></span>' +
                '   </span>' +
                '   <span class="btn btn-sm btn-primary btn-room-info">' +
                '       <span class="fa fa-info"></span>' +
                '   </span>' +
                '</td>' +
                '</tr>');
        } else {
            let Rooms;
            if (status === 6) {// 如果他人加入房间的请求等待自己通过
                Rooms = RoomWaitingForMyPermission;
            } else {// 如果自己加入房间的请求等待他人通过
                Rooms = RoomNotPermitted;
            }
            Rooms.append(
                `<tr data-room-id="${roomId}" onselectstart="return false;">` +
                `<th scope="row">${roomId}</th>` +
                '<td class="room-name"></td>' +
                '<td class="room-type"></td>' +
                '</tr>');
        }
        get_room_by_roomid(roomId, get_room_by_roomid_callback);
    }
    // 点击 tr 中的 th 可以查看房间信息
    $(RoomTable).find('tr[data-room-id]>td>.btn.btn-room-info').on('click', function (event) {
        event.preventDefault();
        let roomId = $(this).parent().parent().data("room-id");
        selectRoomId(roomId);
        get_room_by_roomid(roomId, get_room_by_roomid_callback_room_info);
    });
    // 点击 tr 中的 td 可以进入房间
    $(RoomTable).find('tr[data-room-id]>td>.btn.btn-chat').on('click', function (event) {
        event.preventDefault();
        let roomId = $(this).parent().parent().data("room-id");
        gotoRoom(roomId);
    });
}

function all_rooms() {
    get_rooms_by_userid(sessionStorage.getItem("user-id"), function (data) {
        let field = $("#all-rooms").empty().append(
            '<div class="row mb-2">' +
            '   <div class="col offset-11 px-2 px-sm-2 px-md-4 px-lg-4">' +
            `       <i class="fa fa-times" onclick="$('#all-rooms').empty()"></i>` +
            '   </div>' +
            '</div>');
        for (let e in data) {
            let roomId = data[e].roomid;
            get_room_by_roomid(roomId, function (room) {
                let bg = room.type === 'friends' ? 'bg-info' : 'bg-primary';
                let border = room.type === 'friends' ? 'border-primary' : 'border-dark';
                field.append(
                    `<div class="row ${bg} text-white border ${border}" data-toggle="collapse" data-target="#room-${room.roomid}-info">` +
                    `   <div class="col d-flex justify-content-center align-items-center">${room.roomid}</div>` +
                    `   <div class="col d-flex justify-content-center align-items-center border ${border} border-top-0 border-bottom-0">${room.name}</div>` +
                    `   <div class="col d-flex justify-content-center align-items-center">${room.type}</div>` +
                    '</div>' +
                    `<div class="collapse" id="room-${room.roomid}-info" style="word-break: break-all;word-wrap: break-word;">` +
                    `   <div class="p-2">${JSON.stringify(data[e])}</div>` +
                    `   <div class="px-2 pb-2">${JSON.stringify(room)}</div>` +
                    '</div>' +
                    '<div class="row alert-primary">' +
                    `   <div class="col">live</div>` +
                    `   <div class="col">${room.live}</div>` +
                    '</div>' +
                    '<div class="row alert-primary">' +
                    `   <div class="col col-4 pr-0">create time</div>` +
                    `   <div class="col p-0">${room["create-time"]}</div>` +
                    '</div>');
            });
        }
    });
}

function all_room_users() {
    get_rooms_by_userid(sessionStorage.getItem("user-id"), function (data) {
        let field = $("#all-rooms").empty().append(
            '<div class="row mb-2">' +
            '   <div class="col offset-11 px-2 px-sm-2 px-md-4 px-lg-4">' +
            `       <i class="fa fa-times" onclick="$('#all-rooms').empty()"></i>` +
            '   </div>' +
            '</div>');
        for (let e in data) {
            let roomId = data[e].roomid;
            get_room_by_roomid(roomId, function (room) {
                let bg = room.type === 'friends' ? 'bg-info' : 'bg-primary';
                let border = room.type === 'friends' ? 'border-primary' : 'border-dark';
                field.append(
                    `<div class="row ${bg} text-white border ${border}">` +
                    `   <div class="col d-flex justify-content-center align-items-center">${room.roomid}</div>` +
                    `   <div class="col d-flex justify-content-center align-items-center border ${border} border-top-0 border-bottom-0">${room.name}</div>` +
                    `   <div class="col d-flex justify-content-center align-items-center">${room.type}</div>` +
                    '</div>' +
                    `<div id="room-${room.roomid}-user-list"></div>`);
                get_users_by_roomid(roomId, function (data2) {
                    for (let i = 0; i < data2.length; ++i) {
                        let userId = data2[i].userid;
                        get_user_by_userid(userId, function (user) {
                            field.find(`#room-${room.roomid}-user-list`).append(
                                `<div class="row alert-primary" data-toggle="collapse" data-target="#room-${room.roomid}-user-${userId}-info">` +
                                `   <div class="col offset-1"><img class="avatar" src="${user.avatar}"></div>` +
                                `   <div class="col">${userId}</div>` +
                                `   <div class="col">${user.username}</div>` +
                                `   <div class="col">${data2[i]["status-code"]}</div>` +
                                '</div>' +
                                `<div class="collapse" id="room-${room.roomid}-user-${userId}-info" style="word-break: break-all;word-wrap: break-word;">` +
                                `   <div class="p-2">${JSON.stringify(user)}</div>` +
                                `   <div class="px-2 pb-2">${JSON.stringify(data2[i])}</div>` +
                                '</div>');
                        });
                    }
                });
            });
        }
    });
}

function get_join_room_requests_of_rooms_in_which_i_am_admin(adminId, callback) {
    $.getJSON("user-and-rooms", {
        "admin-id": adminId
    }, function (data) {
        callback && callback(data);
    });
}

function print_join_rooms_requests_of_rooms_in_which_i_am_admin(data) {
    let rooms = $("#join-room-requests-which-need-my-permission table > tbody").empty();
    for (let i = 0; i < data.length; ++i) {
        let requestId = data[i]["id"];
        let roomId = data[i]["roomid"];
        let userId = data[i]["userid"];
        let row = $(
            `<tr data-room-id="${roomId}" onselectstart="return false;">` +
            `   <th scope="row" onclick="">${roomId}</th>` +
            '   <td class="room-name" onclick=""></td>' +
            '   <td class="room-type" onclick=""></td>' +
            '   <td class="room-user-id" onclick=""></td>' +
            '   <td class="room-user-name" onclick=""></td>' +
            '</tr>')
            .on('click', function (event) {
                event.preventDefault();
                // 设置对话框标题
                let ModalTitle = "<span data-chinese='同意加入房间请求'>Permit Join Room Request</span>";
                // 设置对话框内容
                let ModalBody = "<p data-chinese='同意此用户加入到这个房间吗？'>Permit this user to join this room?</p>"
                    + "<div class='btn-group float-right'>"
                    + "<div class='btn btn-outline-primary' id='permit-join-room-button' data-chinese='同意'> Permit </div>"
                    + "<div class='btn btn-outline-danger' data-dismiss='modal' data-chinese='取消'> Cancel </div>"
                    + "</div>";
                // 显示对话框
                appendModal("bg-primary text-white", "text-primary", ModalTitle, ModalBody, "", false);
                refresh_system_language(".modal");
                let This = $(this);
                // 为同意按钮的点击事件绑定函数
                $('#permit-join-room-button').on("click", function () {
                    $.post("admin", {
                        "set": "room-member",
                        "type": "approve user join room request",
                        "admin-id": sessionStorage["user-id"],
                        "session-id": sessionStorage["session-id"],
                        "request-id": requestId
                    }, function (result) {
                        if (parseInt(result) === 1) {
                            This.remove();// 从未通过请求中删除此项
                            appendModal("bg-primary text-white", "text-primary", "Approved", "User Join Room Approved", "");
                        } else {
                            appendModal("bg-inverse text-white", "text-gray-dark", "Failed", "Please Try Again Later", "");
                        }
                    });
                });
            }).appendTo(rooms);
        get_room_by_roomid(roomId, function (data) {
            $(row).find('.room-name').text(data["name"]);
            $(row).find('.room-type').text(data["type"]);
            get_user_by_userid(userId, function (user) {
                $(row).find('.room-user-id').text(user["userid"]);
                $(row).find('.room-user-name').text(user["username"]);
            });
        });
    }
}