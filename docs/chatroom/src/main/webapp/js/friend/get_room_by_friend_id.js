function get_room_by_friendid(Friend_ID, callback) {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    let userid = sessionStorage.getItem("user-id");
    $.getJSON('friend-room', {
        "user-id": userid,
        "friend-id": Friend_ID,
        "type": "friend room"
    }, callback);
}

function get_room_by_friendid_callback(data) {
    let ModalBodyText =
        "<p><span class='badge-wrapper'><span class='badge badge-default'> room id </span></span> <span class='text-muted'>" + data.roomid + "</span></p>" +
        "<p><span class='badge-wrapper'><span class='badge badge-primary'> room name </span></span> " + data.name + "</p>" +
        "<p><span class='badge-wrapper'><span class='badge badge-primary'> create time </span></span> " + data["create-time"] + "</p>" +
        "<p><span class='badge-wrapper'><span class='badge badge-primary'> type </span></span> " + data.type + "</p>" +
        "<p><span class='badge-wrapper'><span class='badge badge-primary'> live </span></span> " + data.live + "</p>";
    appendModal("bg-primary text-white", "text-primary", data.type + " room info", ModalBodyText, "", false);
    get_users_by_roomid(data.roomid, function (data) {
        let friendList = data;
        let ModalBody = $(".modal .modal-body");
        for (i = 0; i < friendList.length; ++i) {
            let friend = friendList[i];
            $(ModalBody).append(
                `<p data-toggle='collapse' data-target='#friend-collapse-${friend.userid}'>` +
                "   <span class='badge-wrapper'>" +
                `       <span class='badge badge-info'> user ${i + 1} ` +
                "       </span>" +
                "   </span>" +
                `   <span class='text-info' id='friend-username-${friend.userid}'>` +
                "   </span>" +
                "</p>" +
                `<div class='collapse' id='friend-collapse-${friend.userid}' style="margin-bottom: 1rem;">` +
                '   <div class="row">' +
                '       <div class="col"> user id </div>' +
                '       <div class="col"> gender </div>' +
                '       <div class="col"> age </div>' +
                '       <div class="col"> avatar </div>' +
                '   </div>' +
                '   <div class="row text-gray-dark">' +
                `       <div class="col" id="friend-user-id-${friend.userid}"> ${friend.userid} </div>` +
                `       <div class="col" id="friend-gender-${friend.userid}"></div>` +
                `       <div class="col" id="friend-age-${friend.userid}"></div>` +
                `       <div class="col"><img id="friend-avatar-${friend.userid}"></div>` +
                '   </div>' +
                "</div>");
            let friendid = friend.userid;
            get_user_by_userid(friend.userid, function (user) {
                $("#friend-username-" + friendid).text(user.username);
                $("#friend-gender-" + friendid).text(user.gender);
                $("#friend-age-" + friendid).text(user.age);
                $("#friend-avatar-" + friendid).attr("src", user.avatar).css({
                    width: "2rem",
                    height: "2rem"
                }).addClass("rounded-circle");
            });
        }
        $(ModalBody).find(".badge-wrapper").css({"display": "inline-block", "min-width": "30%"});
    });
}