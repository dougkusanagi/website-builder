import Widget from "./Widget.js";

export default class LinkWidget extends Widget {
    getHtmlId() {
        return "LinkWidget";
    }

    name() {
        return getI18n('link');
    }

    icon() {
        return 'fal fa-link';
    }
    init() {
        super.init();
    }
}