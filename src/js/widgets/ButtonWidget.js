import Widget from "./Widget.js";

export default class ButtonWidget extends Widget {
    getHtmlId() {
        return "ButtonWidget";
    }

    name() {
        return getI18n('button');
    }

    icon() {
        return 'fal fa-minus-square';
    }
}