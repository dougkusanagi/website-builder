import SuperElement from "./SuperElement.js";

export default class PricingItemElement extends SuperElement  {
    name() {
        return getI18n('pricing_item');
    }

    getControls() {
        var element = this;
        var table = element.obj.closest('[builder-element=PricingTableElement]');

        return [
            new PricingTableControl(getI18n('theme'), table.attr('data-style'), function(style) {
                table.attr('data-style', style);
                if (style == 'dark') {
                    table.find('.col-12').css('background', '#007c89');
                    table.children().css('color', '#fff');
                    table.children().css('border-left', 'none');
                    table.find('.btn').css('border', 'none');
                    table.find('.btn').css('background', '#fff');
                    table.find('.btn').css('color', '#333');
                    table.children().first().children().css('border', 'solid 1px #fff');
                    table.children().first().children().css('border-width', '0px 1px 0px 0px');
                    table.children().first().children().last().css('border-width', '0px 0px 0px 0px');
                } else if (style == 'light') {
                    table.find('.col-12').css('background', 'transparent');
                    table.children().css('color', '#333');
                    table.children().css('border-left', 'none');
                    table.find('.btn').css('border', 'none');
                    table.find('.btn').css('background', '#007c89');
                    table.find('.btn').css('color', '#fff');
                    table.children().first().children().css('border', 'solid 1px #ccc');
                    table.children().first().children().css('border-width', '0px 1px 0px 0px');
                    table.children().first().children().last().css('border-width', '0px 0px 0px 0px');
                } else {
                    table.find('.col-12').css('background', 'transparent');
                    table.children().css('color', '#333');
                    table.children().css('border-left', 'solid 1px #ccc');
                    table.find('.btn').css('border', 'none');
                    table.find('.btn').css('background', '#007c89');
                    table.find('.btn').css('color', '#fff');
                    table.children().first().children().css('border', 'solid 1px #ccc');
                    table.children().first().children().css('border-width', '1px 1px 1px 0px');
                    table.children().first().children().last().css('border-width', '1px 1px 1px 0px');
                }
                element.select();
            }),
            new ColorPickerControl(getI18n('text_color'), element.obj.css('color'), function(color_text) {
                element.obj.css('color', color_text);
            }),
            // new LinkColorControl(getI18n('link_color'), element.obj.css('color'), function(color_link) {
            //     element.obj.css('color', color_link);
            // }),
            new LineHeightControl(getI18n('line_height'), element.obj.css('line-height'), function(line_height) {
                element.obj.css('line-height', line_height);
                element.select();
            }),
            new TextSizeControl(getI18n('text_size'), element.obj.css('font-size'), function(text_size) {
                element.obj.css('font-size', text_size);
                element.obj.find('*').css('font-size', text_size);
                element.select();
            }),
            new TextStyleControl(getI18n('text_style'), {
                    font_weight: element.obj.css('font-weight'),
                    text_decoration: element.obj.css('text-decoration'),
                    font_style: element.obj.css('font-style'),
            }, function(value) {
                element.obj.css('font-weight', value.font_weight);
                element.obj.css('font-style', value.font_style);
                element.obj.css('text-decoration', value.text_decoration);
                element.select();
            }),
            new FontFamilyControl(getI18n('font_family'), element.obj.css('font-family'), function(font_family) {
                element.obj.css('font-family', font_family);
                element.select();
            }),
            new BackgroundImageControl(getI18n('background_image'), {
                image: element.obj.css('background-image'),
                color: element.obj.css('background-color'),
                repeat: element.obj.css('background-repeat'),
                position: element.obj.css('background-position'),
                size: element.obj.css('background-size'),
            }, {
                setBackgroundImage: function (image) {
                    element.obj.css('background-image', image);
                },
                setBackgroundColor: function (color) {
                    element.obj.css('background-color', color);
                },
                setBackgroundRepeat: function (repeat) {
                    element.obj.css('background-repeat', repeat);
                },
                setBackgroundPosition: function (position) {
                    element.obj.css('background-position', position);
                },
                setBackgroundSize: function (size) {
                    element.obj.css('background-size', size);
                },
            }),
            new MobileDesktopToggleControl(getI18n('toogle'), {
                type: element.obj.attr('data-hide-on')
            }, function(type) {
                element.obj.attr('data-hide-on', type);
                setTimeout(function() {
                    currentEditor.select(element);
                }, 100);
            }),
        ];
    }
}