import SuperElement from "./SuperElement.js";

export default class PageElement extends SuperElement  {
    name() {
        return getI18n('page');
    }
    icon() {
        return 'fal fa-font';
    }

    isContainer() {
        return true;
    }

    isWrapper() {
        return true;
    }

    getControls() {
        var element = this;

        return [
            new FontFamilyControl(getI18n('font_family'), element.obj.css('font-family'), function(font_family) {
                element.obj.css('font-family', font_family);
                element.select();
            }),
            new BackgroundImageControl(getI18n('background_image'), {
                image: (element.isWrapper() ? element.obj.css('background-image') : element.obj.css('background-image')),
                color: (element.isWrapper() ? element.obj.css('background-color') : element.obj.css('background-color')),
                repeat: (element.isWrapper() ? element.obj.css('background-repeat') : element.obj.css('background-repeat')),
                position: (element.isWrapper() ? element.obj.css('background-position') : element.obj.css('background-position')),
                size: (element.isWrapper() ? element.obj.css('background-size') : element.obj.css('background-size')),
            }, {
                setBackgroundImage: function (image) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.css('background-image', image);
                    } else {
                        element.obj.css('background-image', image);
                    }
                },
                setBackgroundColor: function (color) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.css('background-color', color);
                    } else {
                        element.obj.css('background-color', color);
                    }
                },
                setBackgroundRepeat: function (repeat) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.css('background-repeat', repeat);
                    } else {
                        element.obj.css('background-repeat', repeat);
                    }
                },
                setBackgroundPosition: function (position) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.css('background-position', position);
                    } else {
                        element.obj.css('background-position', position);
                    }
                },
                setBackgroundSize: function (size) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.css('background-size', size);
                    } else {
                        element.obj.css('background-size', size);
                    }
                },
            }),
            new BlockOptionControl(getI18n('padding'), {
                padding: element.obj.css('padding'),
                top: element.obj.css('padding-top'),
                bottom: element.obj.css('padding-bottom'),
                right: element.obj.css('padding-right'),
                left: element.obj.css('padding-left')
            }, function(options) {
                element.obj.css('padding', options.padding);
                element.obj.css('padding-top', options.top);
                element.obj.css('padding-bottom', options.bottom);
                element.obj.css('padding-right', options.right);
                element.obj.css('padding-left', options.left);
                setTimeout(function() {
                    currentEditor.selected.select();
                }, 100);
            }),
        ];
    }
}