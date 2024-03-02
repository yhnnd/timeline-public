function get_room_by_roomid_callback_room_info(data) {
    let room = data;
    let ValueNames = {};
    if (localStorage.getItem("application-language") === "lang-zh") {
        ValueNames = {
            "room-id": "房间号",
            "room-name": "房间名",
            "create-time": "创建时间",
            "type": "房间类型",
            "live": "阅后即焚",
            "room-info": "房间信息",
            "user": "用户",
            "statistics": "统计数据",
            "invite": "邀请",
            "report": "举报",
            "quit": "退出",
            "delete": "解散"
        };
    } else {
        ValueNames = {
            "room-id": "room id",
            "room-name": "room name",
            "create-time": "create time",
            "type": "type",
            "live": "live",
            "room-info": "room info",
            "user": "user",
            "statistics": "statistics",
            "invite": "invite",
            "report": "report",
            "quit": "quit",
            "delete": "delete"
        };
    }
    let ModalBodyText =
        "<p><span class='badge-wrapper'><span class='badge badge-default'> " + ValueNames["room-id"] + " </span></span> <span class='text-muted'>" + room.roomid + "</span></p>" +
        "<p><span class='badge-wrapper'><span class='badge badge-primary'> " + ValueNames["room-name"] + " </span></span> " + room.name + "</p>" +
        "<p><span class='badge-wrapper'><span class='badge badge-primary'> " + ValueNames["create-time"] + " </span></span> " + room["create-time"] + "</p>" +
        "<p><span class='badge-wrapper'><span class='badge badge-primary'> " + ValueNames["type"] + " </span></span> " + room.type + "</p>" +
        "<p><span class='badge-wrapper'><span class='badge badge-primary'> " + ValueNames["live"] + " </span></span> " + room.live + "</p>" +
        "<p class='cursor-pointer' id='room-info-collapse-toggle-top' data-toggle='collapse' data-target='#room-info-collapse' onclick='$(this).hide();'>" +
        "   <span class='badge-wrapper'>" +
        "       <span class='badge badge-primary'>" +
        " " + ValueNames["user"] +
        "       </span>" +
        "   </span>" +
        "   <span class='text-primary text-underline'>" +
        "       <span data-chinese='点击查看详情'>click to open</span>" +
        "       <i class='fa fa-sort float-right px-3 py-1'></i>" +
        "   </span>" +
        "</p>" +
        "<div class='collapse' id='room-info-collapse'>" +
        "</div>" +
        "<p class='cursor-pointer' id='room-statistics-collapse-toggle-top' data-toggle='collapse' data-target='#room-statistics-collapse' onclick='$(this).hide();'>" +
        "   <span class='badge-wrapper'>" +
        "       <span class='badge badge-primary'>" +
        " " + ValueNames["statistics"] +
        "       </span>" +
        "   </span>" +
        "   <span class='text-primary text-underline'>" +
        "       <span data-chinese='点击查看详情'>click to open</span>" +
        "       <i class='fa fa-sort float-right px-3 py-1'></i>" +
        "   </span>" +
        "</p>" +
        "<div class='collapse' id='room-statistics-collapse'>" +
        "    <div class='chart-wrapper'>" +
        "        <div class='data-container'></div>" +
        "        <div class='svg-container'></div>" +
        "    </div>" +
        "</div>" +
        "<div class='btn-group btn-group-justified' style='width:100%;margin-bottom: 0.5rem;'>" +
        `   <div class='btn btn-sm btn-outline-warning' style='width:25%;' onclick='invite_room(${sessionStorage.getItem("user-id")},${JSON.stringify(room)})'>${ValueNames["invite"]}</div>` +
        `   <div class='btn btn-sm btn-outline-danger' style='width:25%;' onclick='report_room(${sessionStorage.getItem("user-id")},${room.roomid})'>${ValueNames["report"]}</div>` +
        `   <div class='btn btn-sm btn-outline-danger' style='width:25%;' onclick='quit_room(${sessionStorage.getItem("user-id")},${JSON.stringify(room)})'>${ValueNames["quit"]}</div>` +
        `   <div class='btn btn-sm btn-outline-danger' style='width:25%;' onclick='delete_room(${sessionStorage.getItem("user-id")},${room.roomid})'>${ValueNames["delete"]}</div>` +
        "</div>";
    appendModal("bg-primary text-white", "text-primary", room.type + " " + ValueNames["room-info"], ModalBodyText, "", false);
    // 定义加载【聊天室统计数据】的函数
    let draw_pie_chart = function () {
        $(".data-container,.svg-container").empty();
        let pieWidth = $(".svg-container").get(0).clientWidth;
        let names = ["text", "links", "pics", "videos", "files"];
        let dataset = [101, 18, 76, 9, 5];
        draw_pie(".data-container", ".svg-container", pieWidth, names, dataset);
        console.log("room/get_room_info.js draw pie chart");
    };
    // 加载【聊天室统计数据】
    setTimeout(function () {
        draw_pie_chart();
    }, 1000);
    // 找到【聊天室统计数据】显示区域
    let statisticsCollapse = $(".modal .modal-body #room-statistics-collapse");
    // 加载【聊天室统计数据】底部工具栏
    let ToolbarRoomStatistics = $("<p class='text-muted text-center text-underline cursor-pointer'></p>")
        .html("<i class='refresh-room-statistics fa fa-refresh float-left px-3 py-1'></i>")
        .append("<span class='close-room-statistics-collapse' data-chinese='点击隐藏详情'>click to fold</span>")
        .append("<i class='close-room-statistics-collapse fa fa-sort float-right px-3 py-1'></i>")
        .appendTo(statisticsCollapse);
    // 激活刷新【聊天室统计数据】的按钮
    ToolbarRoomStatistics.find(".refresh-room-statistics")
        .off("click")
        .on("click", function () {
            draw_pie_chart();
        });
    // 激活隐藏【聊天室统计数据】的开关
    ToolbarRoomStatistics.find(".close-room-statistics-collapse")
        .off("click")
        .on("click", function () {
            $(statisticsCollapse).collapse("hide");
            $("#room-statistics-collapse-toggle-top").show();
        });
    // 获取该房间所有用户
    get_users_by_roomid(data.roomid, function (data) {
        let userList = data;
        let collapse = $(".modal .modal-body #room-info-collapse");
        // 遍历每个用户
        for (i = 0; i < userList.length; ++i) {
            let user = userList[i];
            // 添加用户到 collapse 中
            $(collapse).append(
                "<p>" +
                "   <span class='badge-wrapper'>" +
                "       <span class='badge badge-info'>" +
                " " + ValueNames["user"] + " " + (i + 1) + " " +
                "       </span>" +
                "   </span>" +
                "   <span class='text-info' id='room-user-username-" + user.userid + "'>" +
                "   </span>" +
                "</p>");
            // 获取每个用户的用户信息
            get_user_by_userid(user.userid, function (user) {
                let user_tag = $("#room-user-username-" + user.userid).text(user.username);// 显示用户名
                // 获取用户是否为管理员
                get_room_manager(room.roomid, user.userid, function (manager) {
                    get_room_info_set_manager(user_tag, room, user, manager, ValueNames);
                });
            });
        }
        // 加载隐藏所有用户的开关
        $("<p class='text-muted text-center text-underline cursor-pointer'></p>")
            .html("<i class='fa fa-refresh float-left px-3 py-1'></i>")
            .append("<span data-chinese='点击隐藏详情'>click to fold</span>")
            .append("<i class='fa fa-sort float-right px-3 py-1'></i>")
            .on("click", function () {
                $(collapse).collapse("hide");
                $("#room-info-collapse-toggle-top").show();
            }).appendTo(collapse);
        $(".modal .modal-body .badge-wrapper").css({"display": "inline-block", "min-width": "30%"});
    });
}

function get_room_info_set_manager(user_tag, room, user, manager, ValueNames) {
    if (manager) {// 如果管理权限数据不为空，则用户是管理员
        $(user_tag).append("<small>(manager)</small>");// 在用户名后加上管理员标记
        if (parseInt(user.userid) === parseInt(sessionStorage.getItem("user-id"))) {// 如果当前用户是管理员
            if (_.contains([1, "1", true, "true"], manager["change-manager"])) {// 当前用户是超级管理员
                user_tag.attr("data-super-manager", true);
            }
            get_room_info_enable_editing(room, manager, ValueNames);// 开启房间信息编辑
        }
    }
    $(user_tag)
        .addClass("cursor-pointer hover-text-underline")
        .off("click")
        .on("click", function () {
            get_room_user_info(room, user, manager);
        });
}

function get_room_user_info(room, user, manager) {
    if (room && user) {
        let isThisUserCurrentUser = parseInt(sessionStorage.getItem("user-id")) === parseInt(user.userid);
        let isCurrentUserSuperManager = $(`#room-user-username-${sessionStorage.getItem("user-id")}[data-super-manager=true]`).length > 0;
        let ModalBodyText =
            "<p class='lead mb-2'>" + room.name + "</p>" +
            "<div class='p-2 mb-3' style='border: 1px solid rgba(2,117,216,0.5);'>" +
            '   <div class="row px-3">' +
            '       <div class="col px-0"> room id </div>' +
            `       <div class="col px-0 text-gray-dark"> ${room.roomid} </div>` +
            '   </div>' +
            '   <div class="row px-3">' +
            '       <div class="col px-0"> name </div>' +
            `       <div class="col px-0 text-gray-dark"> ${room.name} </div>` +
            '   </div>' +
            '   <div class="row px-3">' +
            '       <div class="col px-0"> type </div>' +
            `       <div class="col px-0 text-gray-dark"> ${room.type} </div>` +
            '   </div>' +
            "</div>" +
            "<p class='lead mb-2'>" + user.username + "</p>" +
            "<div class='p-2 mb-3' style='border: 1px solid rgba(2,117,216,0.5);'>" +
            '   <div class="row px-3 text-center">' +
            '       <div class="col px-0"> user id </div>' +
            '       <div class="col px-0"> gender </div>' +
            '       <div class="col px-0"> age </div>' +
            '       <div class="col px-0"> avatar </div>' +
            '   </div>' +
            '   <div class="row px-3 text-center text-gray-dark">' +
            `       <div class="col px-0"> ${user.userid} </div>` +
            `       <div class="col px-0"> ${user.gender} </div>` +
            `       <div class="col px-0"> ${user.age} </div>` +
            `       <div class="col px-0"><img class="rounded-circle" src="${user.avatar}" style="width: 2rem;height: 2rem;"></div>` +
            '   </div>' +
            "</div>";
        let showNickname = true, editNickname = false, title, label;
        if (room.type === "friends") {// 好友类型房间
            title = {
                chinese: "设置备注",
                english: "set nickname"
            };
            label = {
                chinese: "备注",
                english: "nickname"
            };
            if (!isThisUserCurrentUser) {// 此用户是好友（不是我）
                editNickname = true;
            } else {// 如果此用户是我，不能显示好友给我的备注名
                showNickname = false;
            }
        } else {// 其它类型房间
            title = {
                chinese: "设置聊天室名片",
                english: "set chat room nickname"
            };
            label = {
                chinese: "名片",
                english: "nickname"
            };
            if (isThisUserCurrentUser || isCurrentUserSuperManager) {// 此用户是我或者我是房间管理员
                editNickname = true;
            }
        }
        if (showNickname) {
            ModalBodyText +=
                "<p class='lead mb-2'>" +
                `   <span data-chinese='${title.chinese}'>${title.english}</span>` +
                "</p>" +
                "<div class='mb-3'>" +
                '   <div class="input-group">' +
                `       <span class="input-group-addon cursor-pointer" data-chinese="${label.chinese}">${label.english}</span>` +
                `       <input type="text" class="form-control" id="new-nickname" value="" placeholder="${user.username}" ${editNickname ? '' : 'disabled'}>` +
                '       <div class="input-group-btn">' +
                `           <button class="btn btn-primary" onclick="set_nickname('${room.type}',${room.roomid},${user.userid},$('#new-nickname'))" ${editNickname ? '' : 'disabled'}>` +
                '               <span data-chinese="确认">confirm</span>' +
                '           </button>' +
                '       </div>' +
                '   </div>' +
                "</div>";
        }
        if (manager) {
            ModalBodyText +=
                "<p class='lead mb-2'>" +
                "   <span data-chinese='管理员权限'>Manager Privileges</span>" +
                "</p>" +
                "<div class='p-2 mb-3' style='border: 1px solid rgba(2,117,216,0.5);'>";
            for (let key in manager) {
                if (!_.contains(["id", "room-id", "user-id"], key)) {
                    let value = _.contains([1, "1", true, "true"], manager[key]);
                    ModalBodyText +=
                        "<div class='row px-3'>" +
                        "   <div class='col-11 px-0'>" +
                        "       <small>" +
                        `           <i data-admin-privilege-name='${key}'>${key}</i>` +
                        "       </small>" +
                        "   </div>" +
                        `   <div class='col-1 px-0 ${value ? "text-success" : "text-muted"}'>` +
                        `       <i class='fa ${value ? "fa-toggle-on" : "fa-toggle-off"}' data-toggle-admin-privilege='${key}'` +
                        `          style='cursor: ${_.contains(["change-manager"], key) ? "not-allowed" : "pointer"};'></i>` +
                        "   </div>" +
                        "</div>";
                }
            }
            ModalBodyText += "</div>";
        }
        if (_.contains(["secret", "private", "public"], room.type)) {// 如果不是好友聊天室
            if (isCurrentUserSuperManager) {// 如果我是超级管理员
                if (manager) {
                    ModalBodyText +=
                        "<div class='p-2 mb-3' style='border: 1px solid rgba(217, 83, 79, 0.5);'>" +
                        "   <div class='row px-3'>" +
                        "       <div class='col-8 d-flex align-items-center'>" +
                        "           <small class='text-danger' data-chinese='删除此管理员'>remove this manager</small>" +
                        "       </div>" +
                        "       <div class='col-4 d-flex justify-content-end'>" +
                        `           <button class='btn btn-danger py-1' id='remove-room-manager'>` +
                        "               <small data-chinese='删除'>remove</small>" +
                        "           </button>" +
                        "       </div>" +
                        "   </div>" +
                        "</div>";
                } else {
                    ModalBodyText +=
                        "<div class='p-2 mb-3' style='border: 1px solid rgba(2, 117, 216, 0.5);'>" +
                        "   <div class='row px-3'>" +
                        "       <div class='col-8 d-flex align-items-center'>" +
                        "           <small class='text-primary' data-chinese='设置此用户为管理员'>set this user manager</small>" +
                        "       </div>" +
                        "       <div class='col-4 d-flex justify-content-end'>" +
                        `           <button class='btn btn-primary py-1' id='add-room-manager'>` +
                        "               <small data-chinese='应用'>apply</small>" +
                        "           </button>" +
                        "       </div>" +
                        "   </div>" +
                        "</div>";
                }
            }
        }
        let ModalTitle = "<i class='fa fa-chevron-left fa-3 mr-3' onclick='get_room_by_roomid_callback_room_info(" + JSON.stringify(room) + ")'></i>" +
            "<span data-chinese='聊天室成员信息'>Room User Info</span>";
        appendModal("bg-primary text-white", "text-primary", ModalTitle, ModalBodyText, "", false);
        refresh_system_language(".modal");
        $(".modal .modal-body .badge-wrapper").css({"display": "inline-block", "min-width": "30%"});

        // 定义重新显示管理员权限的函数
        let callback = function () {
            get_room_manager(room.roomid, user.userid, function (manager) {
                get_room_user_info(room, user, manager);
            });
        };

        // 激活开关管理员权限的按钮
        $("[data-toggle-admin-privilege]").on("click", function () {
            let name = $(this).data("toggle-admin-privilege");
            let value = $(this).hasClass("fa-toggle-on");
            if (!_.contains(["change-manager"], name)) {
                set_room_manager_privilege(room.roomid, user.userid, {
                    "name": name,
                    "value": value ? 0 : 1,
                    "value-type": "int"
                }, function (data) {
                    if (data && data.result) {
                        callback();
                    }
                });
            }
        });

        // 激活设置（删除）管理员按钮
        let rb = $("button#remove-room-manager");
        let ab = $("button#add-room-manager");
        if (rb.length) {
            rb.on("click", function () {
                remove_room_manager(room.roomid, user.userid, callback)
            });
        } else if (ab.length) {
            ab.on("click", function () {
                add_room_manager(room.roomid, user.userid, callback)
            });
        }
        // 加载用户备注名
        get_user_and_room(user.userid, room.roomid, function (d) {
            if (d.nickname) {
                $(".modal-body #new-nickname").attr("value", d.nickname);
            } else {
                $(".modal-body #new-nickname").attr("value", user.username);
            }
        });
    }
}

function set_friend_nickname(roomId, friendId, input) {
    let nickname = $(input).val();
    $.post("friend-nickname", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": roomId,
        "friend-id": friendId,
        "nickname": nickname
    }, function () {
        get_user_and_room(friendId, roomId, function (d) {
            let row = $('.row[data-room-id="' + roomId + '"]');
            let nicknameField = row.find(".nickname-field");
            if (d.nickname) {
                nicknameField.show().find(".nickname").text(d.nickname);
            } else {
                nicknameField.hide().find(".nickname").text("null");
            }
            row.click();// 刷新好友房间
        });
    });
}

function set_room_user_nickname(roomId, userId, input) {
    let nickname = $(input).val();
    add_loading_icon();
    $.post("room-user-nickname", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id"),
        "room-id": roomId,
        "room-user-id": userId,
        "nickname": nickname
    }, function () {
        get_user_and_room(userId, roomId, function (result) {
            remove_loading_icon();
        });
    });
}

function set_nickname(roomType, roomId, userId, input) {
    if (roomType === "friends") {
        set_friend_nickname(roomId, userId, input);
    } else {
        set_room_user_nickname(roomId, userId, input);
    }
}