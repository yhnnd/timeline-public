function share_card(card_id) {
    let params = {
        "card-id": card_id,
        "sender-id": sessionStorage.getItem("user-id")
    };
    let modalBody = $("<textarea>")
        .addClass("form-control")
        .val(getWebRoot() + "/card-page.html?" + parseParam(params));
    appendModal("bg-primary text-white", "text-primary", "Share Card", modalBody, "", false);
}