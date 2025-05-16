import SuperElement from "./SuperElement.js";

export default class CellElement extends SuperElement  {
    name() {
        return getI18n('cell');
    }
    icon() {
        return 'fal fa-font';
    }

    isContainer() {
        return true;
    }

    canSelect() {
        return true;
    }

    canDelete() {
        return false;
    }

    canDuplicate() {
        return false;
    }

    loadHoverLabel() {
        // check if outline is already exist
        if (this.hoverLabel().length == 0) {
            // outline controls html
            var outline = $(currentEditor.transformHtml(`
                <div class="builder-tool builder-outline-content-hover">{language.drag_items_here}</div>
            `));

            $("#builder_iframe").contents().find("body").append(outline);
        }
    }

    adjustHoverLabelPosition() {
        this.hoverLabel().css('top', this.obj.offset().top - 2);
        this.hoverLabel().css('left', this.obj.offset().left + (this.obj.outerWidth()/2) - (this.hoverLabel().outerWidth()/2) - 2 + 5);
    }

    getControls() {
        var element = this;
        var container = currentEditor.elementFactory(element.obj.closest('[builder-element="CellContainerElement"]'));

        return [
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
        ];
    }
}