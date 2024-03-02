function initAlbum(callback) {
    init_cards(sessionStorage.getItem("user-id"), function (data) {
        let wrap = $('<div id="wrap">');
        let imgs = $('<div id="imgs">');
        let imgCount = 0;
        for (i = 0; i < data.length; ++i) {
            let card = data[i];
            let img = card["cover-image"];
            if (img !== undefined && img !== "") {
                imgs.append(
                    `<div class="img">
                        <div class="page d-flex">
                            <div class="text-center" style="position:absolute;top:0;width:100%;padding: .5rem;">
                                <div class="btn btn-outline-danger page-switch-quit" data-chinese="返回">quit</div>
                            </div>
                            <img src="${getCloudRootPath() + img}" class="align-self-center" style="width: 100%; display: block; cursor: pointer;" ondragstart="return false">
                            <div style="position:absolute;bottom:0;width:100%;padding: .5rem;">
                                <div class="btn btn-sm btn-outline-secondary page-switch-prev float-left" data-chinese="上一页">prev</div>
                                <div class="btn btn-sm btn-outline-secondary page-switch-next float-right" data-chinese="下一页">next</div>
                            </div>
                        </div>
                    </div>`);
                imgCount++;
            }
        }
        let navs = $('<div id="navs">');
        navs.append('<a href="javascript:;" class="active"></a>');
        for (i = 1; i < imgCount; ++i) {
            navs.append('<a href="javascript:;"></a>');
        }

        if (imgCount > 0) {
            wrap.append(imgs);
            wrap.append(navs);
            $('#album')
                .empty()
                .append(wrap)
                .css({
                    "position": "fixed",
                    "top": "0",
                    "left": "0",
                    "z-index": "1000", /* important */
                    "width": window.innerWidth,
                    "height": window.innerHeight
                });

            let page_switch = new pageSwitch('imgs', {
                duration: 300,
                start: 0,
                direction: 0,
                loop: true,
                ease: 'ease',
                transition: 'scrollX',
                mouse: true,
                mousewheel: true,
                arrowkey: true
            });

            $('.page-switch-prev').on("click", function () {
                page_switch.prev();
            });
            $('.page-switch-next').on("click", function () {
                page_switch.next();
            });
            $('.page-switch-quit').on("click", function () {
                $('[data-toggle="tab"][href="#cards"]').click();
            });

            let a = $('#navs').find('a');

            page_switch.on('before', function (m, n) {
                a[m].className = '';
                a[n].className = 'active';
            });

            a.each(function (index, elem) {
                $(elem).on("click", function () {
                    page_switch.slide(index);
                });
            });

            callback && callback();
        }
    });
}
