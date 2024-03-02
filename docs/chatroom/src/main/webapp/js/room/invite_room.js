function invite_room(user_id, room) {
    if (user_id && room) {
        if (["public", "private"].includes(room.type)) {
            let ModalBodyText =
                "<p class='lead'>" + room.name + "</p>" +
                "<p class='p-2' style='border: 1px solid rgba(2,117,216,0.5);'>" +
                "   <small><i>You can visit a specific chat room via a room link. You can also share a room link to your friends to invite them to chat rooms.</i></small>" +
                "</p>" +
                "<p>" +
                "   <span class='badge-wrapper'><span class='badge badge-default'>room link</span></span>" +
                "   <a id='room-share-link'><u><var>" + room.name + "</var></u></a>" +
                "</p>" +
                "<div class='form-group'>" +
                "   <textarea class='form-control form-control-sm' id='room-share-link-input' rows='4'></textarea>" +
                "</div>";
            let ModalTitle = "<i class='fa fa-chevron-left fa-3 mr-3' onclick='get_room_by_roomid_callback_room_info(" + JSON.stringify(room) + ")'></i>" +
                "<span data-chinese='分享聊天室'>Share Room</span>";
            appendModal("bg-primary text-white", "text-primary", ModalTitle, ModalBodyText, "", false);
            $(".modal .modal-body .badge-wrapper").css({"display": "inline-block", "min-width": "30%"});
            let room_url = "room-page.html?user-id=" + user_id + "&" + parseParam(room);
            $('#room-share-link').attr("href", room_url).attr("target", "_blank");
            $('#room-share-link-input').val(getWebRoot() + "/" + room_url);
            let link_input = $('#room-share-link-input');
            if (link_input.val().indexOf("localhost:") < 0 &&
                link_input.val().indexOf("http://") < 0) {
                link_input.val("http://" + link_input.val());
            }
        } else {
            let ModalBodyText =
                "<p class='lead text-primary'>" + room.name + "</p>" +
                "<p class='p-2 text-primary' style='border: 1px solid rgba(2, 117, 216, 0.5);'>" +
                "   <small><i>You can visit a specific chat room via a room link. You can also share a room link to your friends to invite them to chat rooms.</i></small>" +
                "</p>" +
                "<p class='ml-1 mb-1'>" +
                "   <i class='fa fa-warning'></i>" +
                "   <strong>Warning</strong>" +
                "</p>" +
                "<p class='p-2' style='border: 1px solid rgba(217, 83, 79, 0.5);'>" +
                "   <small><i>You can only invite your friends to a <u>public</u> room or a <u>private</u> room. User can not join a <u>friends</u> room and <u>secret</u> room after created.</i></small>" +
                "</p>";
            let ModalTitle = "<i class='fa fa-chevron-left fa-3 mr-3' onclick='get_room_by_roomid_callback_room_info(" + JSON.stringify(room) + ")'></i>" +
                "<span data-chinese='分享聊天室'>Invite Room</span>";
            appendModal("bg-danger text-white", "alert-warning text-danger", ModalTitle, ModalBodyText, "", false);
        }
    }
}