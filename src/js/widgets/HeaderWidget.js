import Widget from "./Widget.js";

export default class HeaderWidget extends Widget {
    getHtmlId() {
        return "HeaderWidget";
    }

    name() {
        return getI18n('header');
    }

    icon() {
        return 'fal fa-heading';
    }
    init() {
        super.init();
    }
}