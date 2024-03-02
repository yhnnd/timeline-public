function refresh_chat_list() {
    get_rooms_by_userid(sessionStorage.getItem("user-id"), function (rooms) {
        print_rooms(rooms);
        setTimeout(function () {
            let button = $('#button-refresh-chat-list');
            button.css({
                "transition": "all .5s ease",
                'transform': 'rotate(360deg)'
            });
            setTimeout(function () {
                button.removeAttr("style");
            }, 500);
        }, 10);
    });
}

function fold_filters() {
    $("#chat-list-filters").toggle();
}

function print_rooms(userAndRoomList) {
    // 收到服务器 RoomService 发来的用户房间数组
    let chatListField = $("#chat-list");
    // 加载搜索框和查看临时会话按钮
    chatListField.empty()
        .append(
            '<div class="row">' +
            '   <div class="offset-1 col-8 px-5 py-2">' +
            '       <input type="text" id="search-room-name" class="form-control form-control-sm">' +
            '   </div>' +
            '   <div class="col-1 p-0 d-flex align-content-center">' +
            '       <i id="button-refresh-chat-list" class="align-self-center fa fa-refresh" onclick="refresh_chat_list()"></i>' +
            '   </div>' +
            '   <div class="col-1 p-0 d-flex justify-content-center align-content-center">' +
            '       <i id="button-fold-filters" class="align-self-center fa fa-sort" onclick="fold_filters()"></i>' +
            '   </div>' +
            '</div>' +
            "<div class='row p-3' id='chat-list-filters'>" +
            "   <div class='col-12 px-0 text-center text-white'>" +
            "       <div class='btn-group'>" +
            "           <div class='btn btn-outline-primary px-2 px-sm-3 py-1 py-sm-2' style='cursor: pointer;' onclick='chat_list_show_viewed()'>" +
            "               <span class='badge badge-pill badge-info'>&nbsp;</span>" +
            "           </div>" +
            "           <div class='btn btn-outline-primary px-2 px-sm-3 py-1 py-sm-2' style='cursor: pointer;' onclick='chat_list_show_unread()'>" +
            "               <span class='badge badge-pill badge-danger' style='opacity: .9;'>&nbsp;</span>" +
            "           </div>" +
            "           <div class='btn btn-outline-primary px-2 px-sm-3 py-1 py-sm-2' style='cursor: pointer;' onclick='chat_list_show_all()'>" +
            "               <span class='badge badge-pill badge-info'>&nbsp;</span>" +
            "               <span class='badge badge-pill badge-danger' style='opacity: .9;margin-left: -1rem;'>&nbsp;</span>" +
            "           </div>" +
            "           <div class='btn btn-outline-primary px-2 px-sm-3 py-1 py-sm-2' style='cursor: pointer;' onclick='chat_list_show_friends_rooms()'>" +
            "               <i class='fa fa-user-circle-o fa-lg'></i>" +
            "           </div>" +
            "           <div class='btn btn-outline-primary px-2 px-sm-3 py-1 py-sm-2' style='cursor: pointer;' onclick='chat_list_show_rooms()'>" +
            "               <i class='fa fa-home fa-lg'></i>" +
            "           </div>" +
            "           <div class='btn btn-outline-primary px-2 px-sm-3 py-1 py-sm-2' style='cursor: pointer;' onclick='chat_list_show_all_rooms()'>" +
            "               <i class='fa fa-user-circle-o'></i>" +
            "               <i class='fa fa-home' style='margin-left: -.3rem;'></i>" +
            "           </div>" +
            "           <div class='btn btn-outline-primary px-2 px-sm-3 py-1 py-sm-2' style='cursor: pointer;' onclick='open_temporary_chats()'>" +
            "               <i class='fa fa-envelope-o fa-lg' style='position: relative;top: -.1rem;'></i>" +
            "           </div>" +
            "       </div>" +
            "   </div>" +
            "</div>");
    // 如果房间数组为空
    if (userAndRoomList.length === 0) {
        chatListField.append(
            "<div class='px-3 py-4 text-center text-muted' style='font-size: 1.75rem;font-weight: 300;'>" +
            "<p data-chinese='你的聊天列表是空的'>Your chat list is empty</p>" +
            "<div class='btn w-75 btn-outline-primary' onclick='search_user(search_user_callback)' data-chinese='添加新好友'>Add new friends</div>" +
            "</div>");
    } else {// 如果房间数组不为空
        for (let i = 0; i < userAndRoomList.length; ++i) {
            let status = userAndRoomList[i]["status-code"];
            if (![4, 8].includes(status)) {
                // 如果自己加入该房间的请求未被通过
                continue;
            }
            let roomid = userAndRoomList[i].roomid;
            let listItem = $(
                '<div class="row p-3" data-room-id="' + roomid + '" onselectstart="javascript: return false;" ' +
                'style="border-bottom: 1px solid rgba(0,0,0,.125);cursor: pointer;">' +
                '<div class="col-xs-3 col-2 col-md-1 col-lg-1 room-avatar-field"><img class="room-avatar rounded-circle"/></div>' +
                '<div class="col-xs-6 col-8 col-md-10 col-lg-10 room-name-field">' +
                '   <span class="room-name btn btn-sm btn-outline-primary br-0" onclick="gotoRoom(' + roomid + ')"></span>' +
                '</div>' +
                '<div class="col-xs-3 col-2 col-md-1 col-lg-1 room-message-count d-flex justify-content-center align-items-center"></div>' +
                '</div>');
            chatListField.append(listItem);
            get_room_by_roomid(roomid, print_room);
        }
        // 当房间搜索框的值改变时，隐藏房间名中不含有搜索关键词的房间
        $('#search-room-name').on("input", function () {
            let roomName = $(this).val();
            chatListField.find('.room-name').each(function (index, elem) {
                $(this).closest(".row").show();
                if (roomName && roomName !== "" && $(this).text().indexOf(roomName) === -1) {
                    $(this).closest(".row").hide();
                }
            })
        })
    }
    change_system_language(localStorage.getItem("application-language"));
}