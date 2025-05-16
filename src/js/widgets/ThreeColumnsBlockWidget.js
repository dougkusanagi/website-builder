// Three columns block
import Widget from "./Widget.js";

export default class ThreeColumnsBlockWidget extends Widget {
    getHtmlId() {
        return "ThreeColumnsBlockWidget";
    }

    init() {
        // default button html
        if ($('#' + this.getHtmlId()).length) {
            this.setButtonHtml($('#' + this.getHtmlId()).html());
        }

        // default content html
        if ($('#' + this.getHtmlId()).length + getI18n('content')) {
            if (currentEditor.emailMode) {
                this.setContentHtml($('#' + this.getHtmlId() + 'EmailContent').html());
            } else {
                this.setContentHtml($('#' + this.getHtmlId() + 'Content').html());
            }
        }

        // default dragging html
        if ($('#' + this.getHtmlId()).length) {
            this.setDraggingHtml($('#' + this.getHtmlId()).html());
        }
    }
}