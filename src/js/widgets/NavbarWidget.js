import Widget from "./Widget.js";

export default class NavbarWidget extends Widget {
    getHtmlId() {
        return "NavbarWidget";
    }

    name() {
        return getI18n('navbar');
    }

    icon() {
        return 'fal fa-bars';
    }
    init() {
        super.init();
    }
}