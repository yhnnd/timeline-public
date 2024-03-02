function init_cards_friends() {
    if (!sessionStorage.getItem("user-id")) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    $.getJSON("friend-cards", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id")
    }, function (data) {
        log.line({
            title: "init_cards_friends()",
            filename: "card/init_cards_friends.js",
            name: "jQuery getJSON 'friend-cards' callback data",
            text: JSON.stringify(data)
        });
        init_cards_callback(data);
        change_system_language(localStorage.getItem("application-language"));
    });
}