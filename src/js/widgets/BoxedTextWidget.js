import Widget from "./Widget.js";

export default class BoxedTextWidget extends Widget {
    getHtmlId() {
        return "BoxedTextWidget";
    }
    name() {
        return getI18n('text');
    }
    icon() {
        return 'fal fa-font';
    }
}