function chat_list_show_viewed() {
    let chatListField = $("#chat-list");
    let messageCountField = chatListField.find(".room-message-count");
    messageCountField.closest(".row").show();
    messageCountField.find(".badge-danger").closest(".row").hide();
}

function chat_list_show_unread() {
    let chatListField = $("#chat-list");
    let messageCountField = chatListField.find(".room-message-count");
    messageCountField.closest(".row").hide();
    messageCountField.find(".badge-danger").closest(".row").show();
}

function chat_list_show_all() {
    let chatListField = $("#chat-list");
    let messageCountField = chatListField.find(".room-message-count");
    messageCountField.closest(".row").show();
}

// 显示好友房间，隐藏普通房间
function chat_list_show_friends_rooms() {
    let chatListField = $("#chat-list");
    let roomAvatarField = chatListField.find(".room-avatar-field");
    roomAvatarField.closest(".row").show();
    roomAvatarField.find(".fa-home").closest(".row").hide();
}

// 显示普通房间，隐藏好友房间
function chat_list_show_rooms() {
    let chatListField = $("#chat-list");
    let roomAvatarField = chatListField.find(".room-avatar-field");
    roomAvatarField.closest(".row").hide();
    roomAvatarField.find(".fa-home").closest(".row").show();
}

// 显示所有房间（包括好友房间）
function chat_list_show_all_rooms() {
    let chatListField = $("#chat-list");
    let roomAvatarField = chatListField.find(".room-avatar-field");
    roomAvatarField.closest(".row").show();
}