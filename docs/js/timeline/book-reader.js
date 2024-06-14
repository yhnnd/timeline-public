// Mon Oct 23 2023
// require function ajax
// require leaflet map

const symbols = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴', '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿'];

const censored = ["中國", "中国", "中共國", "中共国", "共匪國", "共匪国", "大陸", "大陆", "美國", "美国", "淪陷區", "沦陷区", "匪佔區", "匪占区", "共產主義", "共产主义", "共產黨", "共产党", "中共", "共匪", "共黨", "共党", "赤黨", "赤党", "赤匪", "匪黨", "匪党", "匪諜", "匪谍", "毛賊", "毛贼", "黨中央", "党中央", "紅色政權", "CCP", "天安門", "天安门", "中華民國", "中华民国", "國民黨", "国民党", "反共", "滅共", "灭共"];

function insertStr(source, start, newStr) {
    return source.slice(0, start) + newStr + source.slice(start)
}

function inspectImage(src) {
    document.getElementById('inspectImageWrapper').innerHTML += '<div onclick="quitInspectImage()" style="display: block; position: fixed; top: 0; left: 0; width: 100%; z-index: 1499; height: ' + window.innerHeight + 'px; opacity: 0.8; background: black; filter: brightness(0.1);">' +
        '</div>' +
        '<div onclick="quitInspectImage()" style="display: block; position: fixed; top: 0; left: 0; width: 100%; height: ' + window.innerHeight + 'px; z-index: 1500;">' +
        '<div style="display: flex; width: 100%; height: 100%; align-items: center; justify-content: center;">' +
        '<img style="max-width: 100%; height: auto; max-height: 100%;" src="' + src + '">' +
        '</div>' +
        '</div>'
}

function quitInspectImage() {
    document.getElementById('inspectImageWrapper').innerHTML = '';
}

function getRandomId() {
    return ("" + Math.random() * 10).split(".").join("").substring(0, 12) + "-" + (new Date()).getTime();
}

function renderArticle(src, containerClassName, container2ClassName) {
    ajax(src, undefined, function (responseText) {
        responseText = function (responseText) {
            return responseText.split("\n").map((line) => {
                if (line.trim().startsWith("{{") && line.trim().endsWith("}}") && localStorage.getItem("enable-delete-line") === "true") {
                    return line.replace("{{", '@command("delete-start")').replace("}}", '@command("delete-end")');
                } else if (line === "<border>" && localStorage.getItem("enable-border") === "true") {
                    return '@command("border-start")';
                } else if (line === "</border>" && localStorage.getItem("enable-border") === "true") {
                    return '@command("border-end")';
                }
                line = line.replaceAll("<link", '@command("link-start")');
                line = line.replaceAll("</link>", '@command("link-end")');
                return line;
            }).join("\n");
        }(responseText);

        const imgs = [];

        if (localStorage.getItem("enable-img-recognition") === "true" || responseText.includes("@command(\"enable-image-recognition\")")) {
            responseText = responseText.split("\n").map(line => {
                if (line.startsWith("<img ") && line.endsWith(">")) {
                    imgs.push(line);
                    return "@image " + line;
                }
                if (line.startsWith("<div") && line.endsWith(">")) {
                    return "@div_start " + line;
                }
                if (line.startsWith("</div") && line.endsWith(">")) {
                    return "@div_end " + line;
                }
                return line;
            }).join("\n");
        }

        responseText = responseText.replaceAll("<", "&lt;");

        if (localStorage.getItem("enable-img-recognition") === "true" || responseText.includes("@command(\"enable-image-recognition\")")) {
            responseText = responseText.split("\n").map(line => {
                if (line.startsWith("@image &lt;img ") && line.endsWith(">")) {
                    line = line.replace("@image &lt;img ", "<img ");
                    return insertStr(line, line.length - 1, " onclick=\"inspectImage(this.src)\"");
                }
                if (line.startsWith("@div_start &lt;div") && line.endsWith(">")) {
                    return line.replace("@div_start &lt;div", "<div");
                }
                if (line.startsWith("@div_end &lt;/div") && line.endsWith(">")) {
                    return line.replace("@div_end &lt;/div", "</div");
                }
                if (line.includes("@command(\"enable-image-recognition\")")) {
                    return line.replace("@command(\"enable-image-recognition\")", "<span class='highlight-green'>" + "@command(\"enable-image-recognition\")" + "</span>");
                }
                return line;
            }).join("\n");
        }

        responseText = responseText.replaceAll('@command("delete-start")', "<del>");
        responseText = responseText.replaceAll('@command("delete-end")', "</del>");
        responseText = responseText.replaceAll('@command("border-start")', "<div class='has-border'>");
        responseText = responseText.replaceAll('@command("border-end")', "\n</div>");
        responseText = responseText.replaceAll('@command("link-start")', "<div class='link' onclick='openLink(event)'");
        responseText = responseText.replaceAll('@command("link-end")', "</div>");

        if (window.openLink === undefined) {
            window.openLink = function (event) {
                const to = event.target.getAttribute('to');
                if (to) {
                    window.open(to, "_self");
                }
            }
        }

        if (localStorage.getItem("enable-highlight-red") === "true") {
            // highlight all the symbols like ①, ②, ③.
            for (const symbol of symbols) {
                const replacement = "<span class='highlight-red'>" + symbol + "</span>";
                responseText = responseText.replaceAll(symbol, replacement);
            }
        }

        if (localStorage.getItem("enable-censorship") !== "false") {
            // censor all the censored words
            for (const item of censored) {
                const replacement = "<span class='censored'>" + "█".repeat(item.length) + "</span>";
                responseText = responseText.replaceAll(item, replacement);
            }
        }

        if (localStorage.getItem("enable-name-index") === "true") {
            if (window.peoplesNames?.length) {
                window.peoplesNames = window.peoplesNames.sort((a, b) => {
                    return b[0].split(";")[0].length - a[0].split(";")[0].length;
                });
                for (const i in window.peoplesNames) {
                    const items = window.peoplesNames[i];
                    for (const item of items) {
                        const name = item.split(";")[0];
                        let info = item.split(";")[1];
                        if (info == undefined) {
                            info = "点击搜索";
                        }
                        let nameLink = document.createElement("div");
                        nameLink.classList.add("name-link");
                        nameLink.setAttribute("data-info", info);
                        nameLink.setAttribute("data-name-index", i);
                        nameLink.setAttribute("onclick", "searchElement(this)");
                        nameLink.innerHTML = "<span>" + name.split("").join("</span><span>") + "</span>";
                        responseText = responseText.replaceAll(name, nameLink.outerHTML);
                    }
                }
            }
        }

        let parseMapsResult = {};
        const isMapEnabled = localStorage.getItem("enable-at-sign-map") === "true" && window.parseMaps && window.renderMaps;

        if (isMapEnabled) {
            parseMapsResult = parseMaps(responseText);
            responseText = parseMapsResult.text;
        }

        if (localStorage.getItem("enable-at-sign-video") === "true") {
            responseText = responseText.split("\n").map(line => {
                if (line.startsWith("@video")) { // @video resources/35_1713060169.mp4
                    const src = line.split(" ")[1]; // resources/35_1713060169.mp4
                    const fileType = src.split(".").pop(); // mp4
                    const wrapperOpen = '<div class="video-wrapper">';
                    const covers = '<div class="backdrop-filter blur"></div><div class="backdrop-filter white"></div><div class="cover">' + line + '</div>';
                    const videoOpen = '<video width="100%" controls="" style="width: 100%;">';
                    const source = '<source src="' + src + '" type="video/' + fileType + '">'; // <source src="resources/35_1713060169.mp4" type="video/mp4">
                    const videoClose = '</video>';
                    const wrapperClose = '</div>';
                    return wrapperOpen + covers + videoOpen + source + videoClose + wrapperClose;
                }
                return line;
            }).join("\n");
        }

        const listItemNumberLines = [];

        if (responseText.includes("@list-item-number-increment")) {
            const vars = {};
            responseText = responseText.split("\n").map(line => {
                if (line.startsWith("@list-item-number-increment")) {
                    listItemNumberLines.push(line);
                    const open = line.indexOf("(");
                    const close = line.indexOf(")");
                    if (open === -1 || close === -1 || open + 1 >= close) {
                        return line;
                    }
                    const varName = line.substring(open + 1, close);
                    if (vars[varName] === undefined) {
                        vars[varName] = 1;
                    }
                    return "<span class=\"list-item-number\">" + (vars[varName]++) + "</span>";
                }
                return line;
            }).join("\n");
        }

        const lines1 = responseText.split("\n");
        let lines2 = lines1;

        if (localStorage.getItem("enable-line-split") === "true") {
            let lineNumber = 0;
            lines2 = lines1.map(line => {
                if (line === "<div class='has-border'>") {
                    return "<div class='has-border' data-line-number='" + (lineNumber++) + "'><div class='empty-line' data-line-number='" + (lineNumber++) + "'><br></div>";
                } else if (line === "</div>") {
                    return line;
                } else if (line === '') {
                    return "<div class='empty-line' data-line-number='" + (lineNumber++) + "'><br></div>";
                }
                return "<div class='line' data-line-number='" + (lineNumber++) + "'>" + line + "</div>";
            });
            responseText = lines2.join("");
        }

        const container1 = document.getElementsByClassName(containerClassName)[0];

        if (localStorage.getItem("enable-page-split") === "true") {
            const pages = [], linesPage = [];
            let temp = [];
            function pushTempPage() {
                if (linesPage.length === 0) {
                    linesPage.push(lines1[0].includes("page ") ? lines1[0] : "");
                }
                if (localStorage.getItem("enable-line-split") === "true") {
                    pages.push(temp.join(""));
                } else {
                    pages.push(temp.join("\n"));
                }
                temp = [];
            }
            for (let i = 0; i < lines1.length; ++i) {
                if (lines1[i].startsWith("page ") && lines1[i].split(' ').length <= 3) {
                    const pageNumber = parseInt(lines1[i].split(' ')[1]);
                    if (pageNumber > 1 && temp.length) {
                        pushTempPage();
                    }
                    linesPage.push(lines1[i]);
                }
                temp.push(lines2[i]);
            }
            if (temp.length) {
                pushTempPage();
            }
            let pageNumber = 0;
            function getClass() {
                const classList = ["page"];
                if (pageNumber === 0) {
                    classList.push("first-page");
                }
                if (linesPage[pageNumber].length > 12) {
                    classList.push("extra-width");
                }
                if (localStorage.getItem("enable-pre-width-fit-content") === "true" || responseText.includes("@command(\"enable-pre-width-fit-content\")")) {
                    classList.push("width-fit-content");
                }
                return classList.join(" ");
            }
            container1.innerHTML = pages.map(page => {
                return "<pre class=\"" + getClass() + "\" data-page-number=" + pageNumber + " data-page-info=\"" + linesPage[pageNumber++] + "\">" + page + "</pre>";
            }).join("");
        } else {
            const pre = container1.getElementsByTagName("pre")[0];
            if (localStorage.getItem("enable-pre-width-fit-content") === "true" || responseText.includes("@command(\"enable-pre-width-fit-content\")")) {
                pre.classList.add("width-fit-content");
            }
            pre.innerHTML = responseText;
        }

        if (getParameter("is-iframe") !== "true" && localStorage.getItem("enable-badge") === "true") {
            container1.prepend(function () {
                const title = document.createElement("div");
                title.classList = "title";
                const segments = getParameter("src").split("/").slice(1);
                title.innerHTML = "<span class='badge'>" + segments.join("</span>&nbsp;/&nbsp;<span class='badge'>") + "</span>";
                const folderIndex = segments.length - 2;
                const badgeList = title.querySelectorAll(".badge");
                if (folderIndex >= 0 && folderIndex < badgeList.length && searchKeywords) {
                    badgeList[folderIndex].setAttribute("onclick", "searchKeywords([this.innerText], {type: 'folder'})");
                }
                const wrapper = document.createElement("pre");
                wrapper.classList = "badges";
                wrapper.append(title);
                return wrapper;
            }());
        }

        if (getParameter("is-iframe") !== "true" && localStorage.getItem("enable-dual-article-container") === "true") {
            const container2 = document.getElementsByClassName(container2ClassName)[0];
            container1.querySelectorAll("img").forEach(img => {
                img.setAttribute("random-id", "img-" + getRandomId());
            });
            container2.innerHTML = container1.innerHTML;
            container2.parentElement.classList.remove("hidden");
            function getImageWrapper(img) {
                const imgWrapper = document.createElement("div");
                imgWrapper.classList = "img-wrapper";
                imgWrapper.style.width = parseFloat(img.clientWidth) + "px";
                imgWrapper.style.minWidth = parseFloat(img.clientWidth) + "px";
                imgWrapper.style.maxWidth = parseFloat(img.clientWidth) + "px";
                const height = (parseFloat(img.naturalHeight) * parseFloat(img.clientWidth) / parseFloat(img.naturalWidth)) + "px";
                imgWrapper.style.height = height;
                imgWrapper.style.minHeight = height;
                imgWrapper.style.maxHeight = height;
                return imgWrapper;
            }
            container1.querySelectorAll("img").forEach(img => {
                img.onload = function () {
                    const imgWrapper = getImageWrapper(img);
                    imgWrapper.setAttribute("onclick", "inspectImage(\"" + img.src + "\")");
                    const background = document.createElement("div");
                    background.style.backgroundImage = "url(" + img.src + ")";
                    background.classList = "background-image";
                    imgWrapper.append(background);
                    imgWrapper.setAttribute("random-id", img.getAttribute("random-id"));
                    img.replaceWith(imgWrapper);
                }
            });
            container2.querySelectorAll("img").forEach(img => {
                const randomId = img.getAttribute("random-id");
                img.onload = function () {
                    const img = container2.querySelector("[random-id=\"" + randomId + "\"]");
                    const imgWrapper = getImageWrapper(img);
                    const background = document.createElement("div");
                    background.style.backgroundImage = "url(" + img.src + ")";
                    background.classList = "background-image";
                    const backdropBlur = document.createElement("div");
                    backdropBlur.classList = "backdrop-filter blur";
                    const backdropWhite = document.createElement("div");
                    backdropWhite.classList = "backdrop-filter white";
                    const content = document.createElement("div");
                    content.innerText = imgs.shift();
                    content.classList = "content";
                    imgWrapper.append(background);
                    imgWrapper.append(backdropWhite);
                    imgWrapper.append(backdropBlur);
                    imgWrapper.append(content);
                    imgWrapper.setAttribute("random-id", randomId);
                    imgWrapper.innerHTML += `<style>
body[data-value-of-enable-hover-highlight-img="true"]:has([random-id="${randomId}"]:hover) [random-id="${randomId}"] {
    z-index: 10;
    outline: 5px solid yellow;
}
body[data-value-of-enable-hover-highlight-img="true"]:has([random-id="${randomId}"]:hover) [random-id="${randomId}"] .content {
    background-color: white;
}
</style>`;
                    img.replaceWith(imgWrapper);
                }
            });
            if (localStorage.getItem("enable-name-index") === "true") {
                container2.querySelectorAll(".name-link").forEach(l => {
                    l.replaceWith(l.innerText);
                });
            }
            if (localStorage.getItem("enable-border") === "true" && container2.querySelector(".has-border")) {
                container2.querySelectorAll(".has-border").forEach(b => {
                    b.style.borderColor = "transparent";
                    if (localStorage.getItem("enable-line-split") === "true") {
                        b.querySelector(".empty-line:first-child").innerHTML = "&lt;border&gt;";
                        b.querySelector(".empty-line:last-child").innerHTML = "&lt;/border&gt;";
                    } else {
                        b.innerHTML = "&lt;border&gt;" + b.innerHTML.replace(/\n$/, "") + "&lt;/border&gt;";
                    }
                });
            }
            if (isMapEnabled) {
                container2.querySelectorAll(".outer-wrapper").forEach(w => {
                    const t = document.createElement("div");
                    t.classList.add("src-text");
                    t.innerText = parseMapsResult.src.shift();
                    w.prepend(t);
                    w.querySelector(".map-wrapper").remove();
                    w.style.background = "unset";
                });
            }
            container2.querySelectorAll("video").forEach(video => {
                video.removeAttribute("controls");
            });
            if (listItemNumberLines.length) {
                container2.querySelectorAll(".list-item-number").forEach(li => {
                    li.replaceWith(listItemNumberLines.shift());
                });
            }
        } else {
            container1.parentElement.style.justifyContent = "center";
        }

        if (isMapEnabled) {
            renderMaps(parseMapsResult.maps);
        }
    });
}

const src = getParameter("src");
if (src != undefined) {
    renderArticle(src, "container-1", "container-2");
}