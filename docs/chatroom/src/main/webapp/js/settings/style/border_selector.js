function init_border_selector() {
    $(".border-selector").each(function () {
        let object = $(this).data('object');
        if (object) {
            let template =
                '<div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-input-group">' +
                '    <div class="input-group input-group-sm">' +
                '        <label class="input-group-addon bg-faded text-gray-dark" for="' + object + '-border-width" data-chinese="边框宽度">border width</label>' +
                '        <select class="form-control" id="' + object + '-border-width" onchange="">' +
                '            <option value="0" selected>0</option>' +
                '            <option value=".5px">.5px</option>' +
                '            <option value="1px">1px</option>' +
                '            <option value="1.5px">1.5px</option>' +
                '            <option value="2px">2px</option>' +
                '            <option value="2.5px">2.5px</option>' +
                '            <option value="3px">3px</option>' +
                '            <option value=".075rem">.075rem</option>' +
                '            <option value=".125rem">.125rem</option>' +
                '            <option value=".25rem">.25rem</option>' +
                '            <option value=".5rem">.5rem</option>' +
                '        </select>' +
                '    </div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-input-group">' +
                '    <div class="input-group input-group-sm">' +
                '        <label class="input-group-addon bg-faded text-gray-dark" for="' + object + '-border-style" data-chinese="边框样式">border style</label>' +
                '        <select class="form-control" id="' + object + '-border-style" onchange="">' +
                '            <option value="none" selected>none</option>' +
                '            <option value="hidden">hidden</option>' +
                '            <option value="solid">solid</option>' +
                '            <option value="dashed">dashed</option>' +
                '            <option value="dotted">dotted</option>' +
                '            <option value="double">double</option>' +
                '            <option value="groove">groove</option>' +
                '            <option value="ridge">ridge</option>' +
                '            <option value="inset">inset</option>' +
                '            <option value="outset">outset</option>' +
                '            <option value="inherit">inherit</option>' +
                '        </select>' +
                '    </div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-input-group">' +
                '    <div class="input-group input-group-sm" data-toggle="collapse" data-target="#' + object + '-border-color-collapse">' +
                '        <span class="input-group-addon bg-faded text-gray-dark" style="width: 40%;" data-chinese="边框颜色">border color</span>' +
                '        <span class="input-group-addon bg-faded text-gray-dark" style="width: 60%;" id="' + object + '-border-color">rgba(0, 0, 0, 0)</span>' +
                '    </div>' +
                '</div>' +
                '<div class="collapse" id="' + object + '-border-color-collapse">' +
                '    <div class="mx-3 py-3 mb-4 alert-warning">' +
                '        <div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-input-group">' +
                '            <div class="input-group input-group-sm">' +
                '                <label class="input-group-addon bg-faded text-danger" style="width: 40%;" for="' + object + '-border-color-r" data-chinese="红">Red</label>' +
                '                <input class="form-control" id="' + object + '-border-color-r" type="number" value="0" min="0" max="255" step="10" onchange=""/>' +
                '            </div>' +
                '        </div>' +
                '        <div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-input-group">' +
                '            <div class="input-group input-group-sm">' +
                '                <label class="input-group-addon bg-faded text-success" style="width: 40%;" for="' + object + '-border-color-g" data-chinese="绿">Green</label>' +
                '                <input class="form-control" id="' + object + '-border-color-g" type="number" value="0" min="0" max="255" step="10" onchange=""/>' +
                '            </div>' +
                '        </div>' +
                '        <div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-input-group">' +
                '            <div class="input-group input-group-sm">' +
                '                <label class="input-group-addon bg-faded text-primary" style="width: 40%;" for="' + object + '-border-color-b" data-chinese="蓝">Blue</label>' +
                '                <input class="form-control" id="' + object + '-border-color-b" type="number" value="0" min="0" max="255" step="10" onchange=""/>' +
                '            </div>' +
                '        </div>' +
                '        <div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">' +
                '            <div class="input-group input-group-sm">' +
                '                <label class="input-group-addon bg-faded text-gray-dark" style="width: 40%;" for="' + object + '-border-color-a" data-chinese="不透明度">Alpha</label>' +
                '                <input class="form-control" id="' + object + '-border-color-a" type="number" value="0" min="0" max="1" step="0.1" onchange=""/>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 col-input-group">' +
                '    <div class="input-group input-group-sm">' +
                '        <label class="input-group-addon bg-faded text-gray-dark" for="' + object + '-border-radius" data-chinese="边框半径">border radius</label>' +
                '        <select class="form-control" id="' + object + '-border-radius" onchange="">' +
                '            <option value="0">0</option>' +
                '            <option value=".5px">.5px</option>' +
                '            <option value="1px">1px</option>' +
                '            <option value="1.5px">1.5px</option>' +
                '            <option value="2px" selected>2px</option>' +
                '            <option value="2.5px">2.5px</option>' +
                '            <option value="3px">3px</option>' +
                '            <option value="3.5px">3.5px</option>' +
                '            <option value="4px">4px</option>' +
                '            <option value="4.5px">4.5px</option>' +
                '            <option value="5px">5px</option>' +
                '            <option value=".075rem">.075rem</option>' +
                '            <option value=".125rem">.125rem</option>' +
                '            <option value=".25rem">.25rem</option>' +
                '            <option value=".5rem">.5rem</option>' +
                '        </select>' +
                '    </div>' +
                '</div>';
            $(this).replaceWith(template);
        }
    });
}
