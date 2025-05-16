import Widget from "./Widget.js";

export default class ParagraphWidget extends Widget {
    getHtmlId() {
        return "ParagraphWidget";
    }

    name() {
        return getI18n('paragraph');
    }

    icon() {
        return 'fal fa-align-justify';
    }
    init() {
        super.init();
    }
}