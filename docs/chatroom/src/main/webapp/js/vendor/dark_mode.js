function record_current_style(data) {
    setTimeout(function () {
        $("[name='custom-font-color']")
            .attr("placeholder", $("body").css("color"))
            .val($("body").css("color"));
        $("[name='custom-background']")
            .attr("placeholder", $("body").css("background-color"))
            .val($("body").css("background-color"));
    }, (data != undefined && data["init"] == true) ? 0 : 501);
}

// set element style Dark Mode
function set_dark_mode(DarkModeStyleAttributes, elem, data) {
    // put old style attributes to OriginalStyle
    var OriginalStyle = {};
    for (j = 0; j < DarkModeStyleAttributes.length; ++j) {
        var name = DarkModeStyleAttributes[j].name;
        var value = $(elem).css(name);
        OriginalStyle[name] = value;
    }
    // put OriginalStyle to element attribute data-style
    $(elem).attr("data-style", JSON.stringify(OriginalStyle));

    // put new style attributes to DarkModeStyle
    var DarkModeStyle = {};
    for (i = 0; i < DarkModeStyleAttributes.length; ++i) {
        var name = DarkModeStyleAttributes[i].name;
        var value = DarkModeStyleAttributes[i].value;
        DarkModeStyle[name] = value;
    }

    if (data == undefined) {
        // if Dark Mode is called by toggle, set transition
        $(elem).css("transition", "all .5s ease");
    } else if (data["init"] == true) {
        // if Dark Mode is called by init, remove transition
        $(elem).css("transition", "");
    }
    // if element is a child of .btn, it won't be affected by Dark Mode
    if ($(elem).parent().hasClass("btn")) {
        return;
    }
    // apply DarkModeStyle
    $(elem).css(DarkModeStyle);
}

// set element attribute data-style="no-support", all elements in it and itself will not be affected by Dark Mode
function is_no_support_dark_mode(elem) {
    for (; !$(elem).is("html"); elem = $(elem).parent()) {
        if ($(elem).data("style") == "no-support") return true;
    }
    return false;
}

// get classnames of element parents
function getParentsClassNames(elem) {
    return $(elem)
        .parents()
        .map(function () {
            return this.getAttribute("class");
        })
        .get()
        .join(",");
}

// get button color
function getButtonColor(elem) {
    // .btn has class btn-default / btn-primary / btn-success / ...
    var ButtonBrands = ["primary", "success", "info", "warning", "danger"];
    var ButtonColors = {
        "primary": "#428bca",
        "success": "#5cb85c",
        "info": "#5bc0de",
        "warning": "#f0ad4e",
        "danger": "#d9534f"
    };
    var ButtonColor = "rgb(207, 210, 218)";
    for (i = 0; i < ButtonBrands.length; ++i) {
        if ($(elem).hasClass("btn-" + ButtonBrands[i])) {
            ButtonColor = ButtonColors[ButtonBrands[i]];
        }
    }
    // .input-group-addon has parent with class has-success / has-warning / has-error
    var FormGroupBrands = ["has-success", "has-warning", "has-error"];
    var FormGroupColors = {
        "has-success": "#5cb85c",
        "has-warning": "#f0ad4e",
        "has-error": "#d9534f"
    };
    for (i = 0; i < FormGroupBrands.length; ++i) {
        if (getParentsClassNames(elem).indexOf(FormGroupBrands[i]) >= 0) {
            ButtonColor = FormGroupColors[FormGroupBrands[i]];
        }
    }
    return ButtonColor;
}

// data: {"init":true}
function enable_dark_mode(data) {
    var Reserves = ["badge", "label", "glyphicon", "caret", "carousel-indicators", "popover", "container"];
    // recipe 1
    $('body,th,td,div,span,button,li,dt,dd,a,em,strong,small,sup,sub,h1,h2,h3,h4,h5,h6').each(function (index, elem) {
        if (is_no_support_dark_mode(elem)) return;
        // if tag has class in Reserves, abort Dark Mode
        for (i = 0; i < Reserves.length; ++i) {
            if ($(elem).hasClass(Reserves[i])) return;
        }
        var DarkModeStyleAttributes = [
            {"name": "background-color", "value": "rgb(37, 40, 48)"},
            {"name": "color", "value": "rgb(207, 210, 218)"}
        ];
        if ($(elem).css('background-image') != "none" && $(elem).css('background-image').indexOf("linear-gradient(") >= 0) {
            DarkModeStyleAttributes.push({"name": "background", "value": "rgb(37, 40, 48)"});
        }
        if ($(elem).is("em,strong,small,sup,sub")) {

        } else if ($(elem).hasClass('btn') || $(elem).hasClass('input-group-addon')) {
            var ButtonColor = getButtonColor(elem);
            DarkModeStyleAttributes = [
                {"name": "background-color", "value": "rgb(53, 58, 73)"},
                {"name": "color", "value": ButtonColor}
            ];
        } else if (getParentsClassNames(elem).indexOf("list-group-item-text") >= 0) {
            var Brands = ["primary", "success", "info", "warning", "danger"];
            var Colors = {
                "primary": "#428bca",
                "success": "#5cb85c",
                "info": "#5bc0de",
                "warning": "#f0ad4e",
                "danger": "#d9534f"
            };
            var Color = "rgb(207, 210, 218)";
            for (i = 0; i < Brands.length; ++i) {
                if (getParentsClassNames(elem).indexOf("list-group-item-" + Brands[i]) >= 0) {
                    Color = Colors[Brands[i]];
                }
            }
            DarkModeStyleAttributes = [
                {"name": "background-color", "value": "rgb(37, 40, 48)"},
                {"name": "color", "value": Color}
            ];
        } else if ($(elem).is("a")) {
            var pcn = getParentsClassNames(elem);
            var excludes = ["nav", "navbar", "modal", "panel", "jumbotron", "page-header"];
            for (i = 0; i < excludes.length; ++i) {
                if (pcn.indexOf(excludes[i]) >= 0) break;
            }
            if (i == excludes.length) {
                DarkModeStyleAttributes.push({"name": "text-decoration", "value": "underline"});
            } else {
                $(elem).css({"text-decoration": "none"});
            }
        }
        set_dark_mode(DarkModeStyleAttributes, elem, data);
    });
    // recipe 2
    $('ul,ol').each(function (index, elem) {
        if (is_no_support_dark_mode(elem)) return;
        // if tag has class in Reserves, abort Dark Mode
        for (i = 0; i < Reserves.length; ++i) {
            if ($(elem).hasClass(Reserves[i])) return;
        }
        var DarkModeStyleAttributes = [
            {"name": "border-color", "value": "rgb(204, 204, 204)"},
            {"name": "background-color", "value": "rgb(37, 40, 48)"},
            {"name": "color", "value": "rgb(207, 210, 218)"}
        ];
        set_dark_mode(DarkModeStyleAttributes, elem, data);
    });
    // recipe 3
    $('input,select,textarea').each(function (index, elem) {
        if (is_no_support_dark_mode(elem)) return;
        // if tag has class in Reserves, abort Dark Mode
        for (i = 0; i < Reserves.length; ++i) {
            if ($(elem).hasClass(Reserves[i])) return;
        }
        // set color of input.btn
        var ButtonColor = getButtonColor(elem);
        var DarkModeStyleAttributes = [
            {"name": "background-color", "value": "rgb(67, 72, 87)"},
            {"name": "color", "value": ButtonColor}
        ];
        set_dark_mode(DarkModeStyleAttributes, elem, data);
    });
    // remember Dark Mode
    localStorage.is_dark_mode = "true";
    record_current_style();
}

// restore old style
function disable_dark_mode() {
    $('[data-style]').each(function (index, elem) {
        // get old style
        var OriginalStyle = $(elem).data("style");
        // remove data-style
        $(elem).removeAttr("data-style");
        // if original color is same with current color
        if (OriginalStyle["color"] == $(elem).css("color") ||
            // if original backgroundColor is same with current backgroundColor
            OriginalStyle["background-color"] == $(elem).css("background-color") ||
            // if color is same with backgroundColor
            OriginalStyle["color"] == OriginalStyle["background-color"] ||
            // if original backgroundColor is transparent
            OriginalStyle["background-color"] == "rgba(0, 0, 0, 0)"
        ) {
            // remove style affected by dark mode
            $(elem).css({
                "background-color": "",
                "color": ""
            });
        } else {
            // if Light Mode is called by toggle, set transition
            $(elem).css("transition", "all .5s ease");
            // restore old style
            $(elem).css(OriginalStyle);
        }
    })
    localStorage.removeItem("is_dark_mode");
    record_current_style();
}

// data: {'class':'style-mode-name','true':'dark','false':'light'}
function toggle_dark_mode(data) {
    if (localStorage.is_dark_mode == undefined) {
        localStorage.is_dark_mode = "true";
        // set style mode button name to "light"
        $("." + data["class"]).html(data["false"]);
        enable_dark_mode();
    } else if (localStorage.is_dark_mode == "true" || localStorage.is_dark_mode == 1) {
        localStorage.removeItem("is_dark_mode");
        // set style mode button name to "dark"
        $("." + data["class"]).html(data["true"]);
        disable_dark_mode();
    }
}

// init Dark Mode
function init_dark_mode(callback) {
    if (localStorage.is_dark_mode == "true" || localStorage.is_dark_mode == 1) {
        $(".style-mode-name").html("light mode");
        enable_dark_mode({"init": true});
    }
    record_current_style({"init": true});
    callback && callback();
}

// call this function after calling init_dark_mode_start()
function init_dark_mode_end() {
    // remove #style-mode-progress
    $('#style-mode-progress').css("opacity", "0");
    // #style-mode-progress has style "transition:opacity .3s"
    setTimeout(function () {
        $('#style-mode-progress').remove();
    }, 300);
}
