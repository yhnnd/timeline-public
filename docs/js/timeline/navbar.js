document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.createElement("div");
    navbar.classList.add("navbar");
    const button = document.createElement("button");
    button.innerText = "Go Back";
    button.addEventListener("click", function () {
        if (window.location.pathname.endsWith("/book.html")) {
            window.open("index.html", "_self");
        } else {
            history.back();
        }
    });
    navbar.append(button);

    const info = document.createElement("div");
    info.classList.add("info");
    navbar.append(info);

    document.body.prepend(navbar);

    const fakeNavbar = document.createElement("div");
    fakeNavbar.classList.add("fake-navbar");
    document.body.prepend(fakeNavbar);

    for (const [key, value] of Object.entries(localStorage)) {
        document.body.setAttribute("data-value-of-" + key, value);
    }

    function getParameter(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r) return decodeURIComponent(r[2]);
        return null;
    }

    const isIframe = getParameter("is-iframe");
    if (isIframe == "true") {
        document.body.setAttribute("is-iframe", "true");
    }
});
