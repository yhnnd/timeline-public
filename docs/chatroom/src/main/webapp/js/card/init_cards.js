function init_cards(userid, callback) {
    if (userid === undefined || userid === null) {
        appendModal("bg-danger text-white", "text-danger", "Warning", "please log in first");
        return;
    }
    $.getJSON("cards", {
        "user-id": sessionStorage.getItem("user-id"),
        "session-id": sessionStorage.getItem("session-id")
    }, function (data) {
        log.line({
            title: "init_cards()",
            filename: "card/init_cards.js",
            name: "jQuery getJSON 'cards' callback data",
            text: JSON.stringify(data)
        });
        callback && callback(data);
        change_system_language(localStorage.getItem("application-language"));
    });
}