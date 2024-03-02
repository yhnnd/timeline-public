function set_unread_message_count(unreadMessageCount) {
    let unreadMessageBadge = $("#unread-message-count");
    if (unreadMessageCount < 0) unreadMessageCount = 0;
    unreadMessageBadge.text(unreadMessageCount);
    if (unreadMessageCount > 0) unreadMessageBadge.show();
    else unreadMessageBadge.hide();
}

function add_unread_message_count() {
    let unreadMessageBadge = $("#unread-message-count");
    let unreadMessageCount = parseInt(unreadMessageBadge.text());
    if (typeof(unreadMessageCount) === "number" && unreadMessageCount >= 0) unreadMessageCount += 1;
    else unreadMessageCount = 0;
    set_unread_message_count(unreadMessageCount);
}

function cut_unread_message_count() {
    let unreadMessageBadge = $("#unread-message-count");
    let unreadMessageCount = parseInt(unreadMessageBadge.text());
    if (typeof(unreadMessageCount) === "number" && unreadMessageCount >= 1) unreadMessageCount -= 1;
    else unreadMessageCount = 0;
    set_unread_message_count(unreadMessageCount);
}