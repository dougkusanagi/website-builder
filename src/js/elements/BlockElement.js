import SuperElement from "./SuperElement.js";

export default class BlockElement extends SuperElement  {
    name() {
        return getI18n('block');
    }
    icon() {
        return 'fal fa-font';
    }

    isDraggable() {
        return true;
    }

    getControls() {
        var element = this;
        var container = element.obj;

        // emailMode = true. Find the fist
        if (currentEditor.emailMode && element.obj.prop("tagName") == 'TABLE') {
            if (element.obj.find('td').length) {
                container = element.obj.find('td').first();
            }

            return [
                new FontFamilyControl(getI18n('font_family'), container.css('font-family'), function(font_family) {
                    container.css('font-family', font_family);
                    currentEditor.selected.select();
                }),
                new AlignmentControl('alignment', { align: container.css('text-align') }, {
                    setAlign: function(pos) {
                        console.log(pos);
                        container.css('text-align', pos);
                    }
                }),
                new BackgroundImageControl(getI18n('background_image'), {
                    image: container.css('background-image'),
                    color: container.css('background-color'),
                    repeat: container.css('background-repeat'),
                    position: container.css('background-position'),
                    size: container.css('background-size'),
                }, {
                    setBackgroundImage: function (image) {
                        // if is wrapper
                        if (element.isWrapper()) {
                            container.closest('body').css('background-image', image);
                        } else {
                            container.css('background-image', image);
                        }
                    },
                    setBackgroundColor: function (color) {
                        // if is wrapper
                        if (element.isWrapper()) {
                            container.closest('body').css('background-color', color);
                        } else {
                            container.css('background-color', color);
                        }
                    },
                    setBackgroundRepeat: function (repeat) {
                        // if is wrapper
                        if (element.isWrapper()) {
                            container.closest('body').css('background-repeat', repeat);
                        } else {
                            container.css('background-repeat', repeat);
                        }
                    },
                    setBackgroundPosition: function (position) {
                        // if is wrapper
                        if (element.isWrapper()) {
                            container.closest('body').css('background-position', position);
                        } else {
                            container.css('background-position', position);
                        }
                    },
                    setBackgroundSize: function (size) {
                        // if is wrapper
                        if (element.isWrapper()) {
                            container.closest('body').css('background-size', size);
                        } else {
                            container.css('background-size', size);
                        }
                    },
                }),
                new BlockOptionControl(getI18n('padding'), {
                    padding: container.css('padding'),
                    top: container.css('padding-top'),
                    bottom: container.css('padding-bottom'),
                    right: container.css('padding-right'),
                    left: container.css('padding-left')
                }, function(options) {
                    container.css('padding', options.padding);
                    container.css('padding-top', options.top);
                    container.css('padding-bottom', options.bottom);
                    container.css('padding-right', options.right);
                    container.css('padding-left', options.left);
    
                    setTimeout(function() {
                        currentEditor.selected.select();
                    }, 100);
                }),
                new MobileDesktopToggleControl(getI18n('toogle'), {
                    type: container.attr('data-hide-on')
                }, function(type) {
                    container.attr('data-hide-on', type);
                    setTimeout(function() {
                        currentEditor.selected.select();
                    }, 100);
                }),
            ];
        }

        return [
            new FontFamilyControl(getI18n('font_family'), element.obj.css('font-family'), function(font_family) {
                element.obj.css('font-family', font_family);
                currentEditor.selected.select();
            }),
            new AlignmentControl('alignment', { align: element.obj.css('text-align') }, {
                setAlign: function(pos) {
                    console.log(pos);
                    element.obj.css('text-align', pos);
                }
            }),
            new BackgroundImageControl(getI18n('background_image'), {
                image: element.obj.css('background-image'),
                color: element.obj.css('background-color'),
                repeat: element.obj.css('background-repeat'),
                position: element.obj.css('background-position'),
                size: element.obj.css('background-size'),
            }, {
                setBackgroundImage: function (image) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.closest('body').css('background-image', image);
                    } else {
                        element.obj.css('background-image', image);
                    }
                },
                setBackgroundColor: function (color) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.closest('body').css('background-color', color);
                    } else {
                        element.obj.css('background-color', color);
                    }
                },
                setBackgroundRepeat: function (repeat) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.closest('body').css('background-repeat', repeat);
                    } else {
                        element.obj.css('background-repeat', repeat);
                    }
                },
                setBackgroundPosition: function (position) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.closest('body').css('background-position', position);
                    } else {
                        element.obj.css('background-position', position);
                    }
                },
                setBackgroundSize: function (size) {
                    // if is wrapper
                    if (element.isWrapper()) {
                        element.obj.closest('body').css('background-size', size);
                    } else {
                        element.obj.css('background-size', size);
                    }
                },
            }),
            new BlockOptionControl(getI18n('padding'), {
                padding: container.css('padding'),
                top: container.css('padding-top'),
                bottom: container.css('padding-bottom'),
                right: container.css('padding-right'),
                left: container.css('padding-left')
            }, function(options) {
                container.css('padding', options.padding);
                container.css('padding-top', options.top);
                container.css('padding-bottom', options.bottom);
                container.css('padding-right', options.right);
                container.css('padding-left', options.left);

                setTimeout(function() {
                    currentEditor.selected.select();
                }, 100);
            }),
            new MobileDesktopToggleControl(getI18n('toogle'), {
                type: element.obj.attr('data-hide-on')
            }, function(type) {
                element.obj.attr('data-hide-on', type);
                setTimeout(function() {
                    currentEditor.selected.select();
                }, 100);
            }),
        ];
    }
}