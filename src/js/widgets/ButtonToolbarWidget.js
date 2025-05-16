import Widget from "./Widget.js";

export default class ButtonToolbarWidget extends Widget {
    getHtmlId() {
        return "ButtonToolbarWidget";
    }

    name() {
        return getI18n('button_toolbar');
    }

    icon() {
        return 'fal fa-grip-horizontal';
    }
    init() {
        super.init();
    }
}