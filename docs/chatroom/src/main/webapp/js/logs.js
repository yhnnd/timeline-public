let log = {
    search: function (keyword, scope) {
        if (!scope) scope = $("#logs-field");
        this.hideAll(scope);
        let items = scope.find('.log-item');
        if (keyword && keyword !== "") {
            items.each(function (index, elem) {
                if ($(elem).text().indexOf(keyword) >= 0) {
                    $(elem).show();
                } else {
                    $(elem).hide();
                }
            })
        } else {
            items.show();
        }
    },
    reverseAll: function (scope) {
        if (!scope) scope = $("#logs-field");
        this.hideAll(scope);
        let items = scope.find('.log-item');
        scope.empty();
        for (let i = items.length - 1; i >= 0; --i) {
            scope.append(items[i]);
        }
    },
    remove: function (button) {
        $(button).closest(".log-item").remove();
    },
    showAll: function (scope) {
        $(scope).find('.collapse').collapse('show');
        $(scope).find('.fa-caret-down').removeClass("fa-caret-down").addClass("fa-caret-up");
    },
    hideAll: function (scope) {
        $(scope).find('.collapse').collapse('hide');
        $(scope).find('.fa-caret-up').removeClass("fa-caret-up").addClass("fa-caret-down");
    },
    toggleAll: function (scope) {
        if (!scope) scope = "#logs-field";
        if ($(scope).find('.collapse.show').length === 0) {
            this.showAll(scope);
        } else {
            this.hideAll(scope);
        }
    },
    toggle: function (toggle) {
        let collapse = $($(toggle).data("target"));
        let caret = $(toggle).find(".fa-caret-down,.fa-caret-up");
        if (collapse.hasClass("show")) {
            caret.removeClass("fa-caret-up").addClass("fa-caret-down");
        } else {
            caret.removeClass("fa-caret-down").addClass("fa-caret-up");
        }
    },
    line: function (data, scope, fa) {
        if (!scope) scope = "#logs-field";
        if (!fa) fa = 'fa-info-circle text-primary';
        if (getWebRoot() === "localhost:8080") {
            let date = new Date();
            let collapse_id = 'log-collapse-' + Math.random().toString().split('.').join('');
            let line =
                '<div class="log-item w-100 py-2" style="word-break: break-all;">' +
                '   <div class="log-title w-100" style="cursor:pointer;" data-toggle="collapse" data-target="#' + collapse_id + '" onclick="log.toggle(this);">' +
                '       <i class="fa fa-ban text-danger mr-2" style="cursor: pointer;" onclick="log.remove(this);"></i>' +
                '       <span>' + data.title + '</span>' +
                '       <span class="float-right">' +
                '           <i class="fa fa-caret-down fa-lg" style="position: relative; top: .125rem; cursor:pointer;"></i>' +
                '       </span>' +
                '   </div>' +
                '   <div class="collapse" id="' + collapse_id + '">' +
                '       <div class="card card-outline-secondary p-0 my-2" style="border-radius: 0;">' +
                '           <div class="card-block log-filename p-2">' +
                '               <i class="fa fa-folder-o fa-lg"></i>' +
                '               <span>' + data.filename + '</span>' +
                '           </div>' +
                '           <div class="card-footer log-time p-2">' +
                '               <i class="fa fa-clock-o fa-lg"></i>' +
                '               <span>' + date.toDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds() + '</span>' +
                '           </div>' +
                '           <div class="card-footer log-name p-2">' +
                '               <i class="fa ' + fa + ' fa-lg"></i>' +
                '               <code class="prettyprint">' + data.name + '</code>' +
                '           </div>';
            if (typeof(data.text) === "string") {
                line +=
                    '       <div class="card-footer log-text p-2">' +
                    '           <code class="prettyprint d-inline-block w-100" style="word-break: break-all;word-wrap: break-word;">' +
                    '               <small><kbd class="fa fa-code fa-lg p-1"></kbd></small>' +
                    '               ' + data.text + '' +
                    '           </code>' +
                    '       </div>';
            } else if (Array.isArray(data.text)) {
                for (let i = 0; i < data.text.length; ++i) {
                    line +=
                        '   <div class="card-footer log-text p-2">' +
                        '       <code class="prettyprint d-inline-block w-100" style="word-break: break-all;word-wrap: break-word;">' +
                        '           <small><kbd class="fa fa-code fa-lg p-1"></kbd></small>' +
                        '           ' + data.text[i] + '' +
                        '       </code>' +
                        '   </div>';
                }
            }
            line +=
                '       </div>' +
                '   </div>' +
                '</div>';
            $(scope).append(line);
            prettyPrint("#" + collapse_id);
        } else {
            $(scope).append("<div class='log-item w-100 py-2'>" +
                "<div>logs can only be displayed when testing on localhost.</div>" +
                "<div>日志只能在本地测试时显示</div>" +
                "</div>");
        }
    },
    error: function (data) {
        this.line(data, "#error-logs-field", "fa-exclamation-circle text-warning");
    }
};