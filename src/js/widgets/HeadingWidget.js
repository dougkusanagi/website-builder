import Widget from "./Widget.js";

export default class HeadingWidget extends Widget {
    getHtmlId() {
        return "HeadingWidget";
    }

    name() {
        return getI18n('heading');
    }

    icon() {
        return 'fal fa-h2';
    }
    init() {
        super.init();
    }
}