import Widget from "./Widget.js";

export default class PanelWidget extends Widget {
    getHtmlId() {
        return "PanelWidget";
    }

    name() {
        return getI18n('panel');
    }

    icon() {
        return 'fal fa-columns';
    }
    init() {
        super.init();
    }
}