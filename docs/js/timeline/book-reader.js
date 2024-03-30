// Mon Oct 23 2023
// require function ajax

const symbols = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴', '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿'];

const censored = ["中國", "中国", "中共國", "中共国", "共匪國", "共匪国", "大陸", "大陆", "美國", "美国", "淪陷區", "沦陷区", "匪佔區", "匪占区", "共產主義", "共产主义", "共產黨", "共产党", "中共", "共匪", "共黨", "共党", "赤黨", "赤党", "赤匪", "匪黨", "匪党", "匪諜", "匪谍", "毛賊", "毛贼", "黨中央", "党中央", "紅色政權", "CCP", "天安門", "天安门", "中華民國", "中华民国", "國民黨", "国民党", "反共", "滅共", "灭共"];

const src = getParameter("src");
if (src != undefined) {
    ajax(src, undefined, function (responseText) {
        console.log("responseText: ", responseText);

        responseText = function (responseText) {
            return responseText.split("\n").map((line) => {
                if (line.trim().startsWith("{{") && line.trim().endsWith("}}") && localStorage.getItem("enable-delete-line") === "true") {
                    return line.replace("{{", '@command("delete-start")').replace("}}", '@command("delete-end")');
                } else if (line === "<border>" && localStorage.getItem("enable-border") === "true") {
                    return '@command("border-start")';
                } else if (line === "</border>" && localStorage.getItem("enable-border") === "true") {
                    return '@command("border-end")';
                }
                return line;
            }).join("\n");
        }(responseText);

        if (localStorage.getItem("enable-img-recognition") === "true" || responseText.includes("@command(\"enable-image-recognition\")")) {
            responseText = responseText.split("\n").map(line => {
                if (line.startsWith("<img ") && line.endsWith(">")) {
                    return "@image " + line;
                }
                return line;
            }).join("\n");
        }

        responseText = responseText.replaceAll("<", "&lt;");

        if (localStorage.getItem("enable-img-recognition") === "true" || responseText.includes("@command(\"enable-image-recognition\")")) {
            responseText = responseText.split("\n").map(line => {
                if (line.startsWith("@image &lt;img ") && line.endsWith(">")) {
                    return line.replace("@image &lt;img ", "<img style='width:100%;' ");
                }
                return line;
            }).join("\n");
        }

        responseText = responseText.replaceAll('@command("delete-start")', "<del>");
        responseText = responseText.replaceAll('@command("delete-end")', "</del>");
        responseText = responseText.replaceAll('@command("border-start")', "<div class='has-border'>");
        responseText = responseText.replaceAll('@command("border-end")', "\n</div>");

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

        const container = document.getElementsByClassName("container")[0];

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
                return classList.join(" ");
            }
            container.innerHTML = pages.map(page => {
                return "<pre class=\"" + getClass() + "\" data-page-number=" + pageNumber + " data-page-info=\"" + linesPage[pageNumber++] + "\">" + page + "</pre>";
            }).join("");
        } else {
            const pre = container.getElementsByTagName("pre")[0];
            pre.innerHTML = responseText;
        }

        if (getParameter("is-iframe") !== "true" && localStorage.getItem("enable-badge") === "true") {
            container.prepend(function () {
                const title = document.createElement("div");
                title.style.color = "var(--studio-purple-50)";
                title.style.width = "min(100vw, calc(512px + (100vw - 512px) / 2))";
                title.innerHTML = "<span class='badge'>" + getParameter("src").split("/").slice(1).join("</span>&nbsp;/&nbsp;<span class='badge'>") + "</span>";
                const wrapper = document.createElement("pre");
                wrapper.innerHTML = title.outerHTML;
                return wrapper;
            }());
        }
    });
}
