document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.createElement("div");
    navbar.classList.add("navbar");
    const button = document.createElement("button");
    button.innerText = "Go Back";
    button.addEventListener("click", function () {
        history.back();
    });
    navbar.append(button);
    document.body.prepend(navbar);

    const fakeNavbar = document.createElement("div");
    fakeNavbar.classList.add("fake-navbar");
    document.body.prepend(fakeNavbar);

    document.body.setAttribute("data-value-of-enable-navbar", localStorage.getItem("enable-navbar"));
});
