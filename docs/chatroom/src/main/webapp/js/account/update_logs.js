function show_update_logs() {
    $("body>.container,body>.container-fluid").hide();// hide homepage
    let doc = $("<div class='container-fluid' id='doc-for-dev'>");
    $(doc).load("doc.html").attr("onselectstart", "javascript: return false;");
    $("body").prepend(doc);
}

function hide_update_logs() {
    $("#doc-for-dev").remove();
    $("body>.container,body>.container-fluid").show();// show homepage
}