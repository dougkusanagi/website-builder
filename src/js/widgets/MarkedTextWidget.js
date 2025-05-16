import Widget from "./Widget.js";

export default class MarkedTextWidget extends Widget {
    getHtmlId() {
        return "MarkedTextWidget";
    }

    name() {
        return getI18n('paragraph');
    }

    icon() {
        return 'fal fa-info-circle';
    }
    init() {
        super.init();
    }
}