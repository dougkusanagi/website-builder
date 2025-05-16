import Widget from "./Widget.js";

export default class Button2Widget extends Widget {
    getHtmlId() {
        return "Button2Widget";
    }

    name() {
        return getI18n('button');
    }

    icon() {
        return 'fal fa-minus-square';
    }
}