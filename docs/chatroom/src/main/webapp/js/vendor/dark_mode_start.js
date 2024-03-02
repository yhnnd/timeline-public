// call this before init_dark_mode()
function init_dark_mode_start() {
    let backgroundColor = "#fff";
    let color = "black";
    if (localStorage.is_dark_mode && localStorage.is_dark_mode == "true") {
        backgroundColor = "rgb(37, 40, 48)";
        color = "white";
    }
    document.write(
        "<div id='style-mode-progress' \
        data-style='no-support' \
        style='\
        background:" + backgroundColor + ";\
        color:" + color + ";\
        opacity:1;\
        position:fixed;\
        top:0;\
        left:0;\
        z-index:10000;\
        width:100%;\
        height:" + window.innerHeight + "px;\
        padding-top:" + window.innerHeight / 2 + "px;\
        display:block;\
        text-align:center;\
        transition:opacity .3s ease;\
        '>\
        <i class='fa fa-circle-o-notch fa-spin fa-3x fa-fw' onclick='body.removeChild(document.getElementById(&quot;style-mode-progress&quot;));'></i>\
        </div>");
}

init_dark_mode_start();