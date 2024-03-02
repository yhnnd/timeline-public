function append_message_no_connection() {
    let backgroundColor = "#fff";
    let color = "black";
    if (localStorage.is_dark_mode && [true, "true"].includes(localStorage.is_dark_mode)) {
        backgroundColor = "rgb(37, 40, 48)";
        color = "white";
    }
    let blackout = $("<div>")
        .addClass("fixed-top " + (isMobile() ? "container-fluid" : "container") + " w-100 d-flex justify-content-center align-items-center")
        .attr({
            "id": "connection-closed-blackout",
            "data-style": "no-support"
        }).css({
            height: window.innerHeight + "px",
            opacity: "1",
            color: color,
            background: backgroundColor,
        });
    let button = $("<div>")
        .addClass("d-block text-center text-danger " + (isMobile() ? "display-4 p-3" : "display-2 p-5"))
        .text("WebSocket Connection Closed")
        .css({
            cursor: "pointer",
            border: "3px solid #d9534f"
        }).on("click", function () {
            $.get('test_connection.txt').done(function () {
                window.location.reload();
            }).fail(function () {
                appendSystemMessage({
                    "badge-class": "inverse",
                    "text-class": "gray-dark",
                    "message": "No Internet Connection"
                });
            });
        });
    blackout.html(button);
    $("body").append(blackout);
}