import Widget from "./Widget.js";

export default class SelectWidget extends Widget {
    getHtmlId() {
        return "SelectWidget";
    }

    name() {
        return getI18n('select');
    }

    icon() {
        return 'fal fa-caret-down';
    }
    init() {
        super.init();
    }
}