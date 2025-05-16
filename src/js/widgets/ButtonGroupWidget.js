import Widget from "./Widget.js";

export default class ButtonGroupWidget extends Widget {
    getHtmlId() {
        return "ButtonGroupWidget";
    }

    name() {
        return getI18n('button_group');
    }

    icon() {
        return 'fal fa-th-large';
    }
    init() {
        super.init();
    }
}