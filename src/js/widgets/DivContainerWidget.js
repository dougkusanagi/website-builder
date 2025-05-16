import Widget from "./Widget.js";

export default class DivContainerWidget extends Widget {
    getHtmlId() {
        return "DivContainerWidget";
    }

    name() {
        return getI18n('div_container');
    }
    icon() {
        return 'fal fa-align-justify';
    }
    init() {
        super.init();
    }
}