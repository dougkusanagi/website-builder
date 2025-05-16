import Widget from "./Widget.js";

export default class InputFieldWidget extends Widget {
    getHtmlId() {
        return "InputFieldWidget";
    }

    name() {
        return getI18n('input_field');
    }

    icon() {
        return 'fal fa-minus';
    }
    init() {
        super.init();
    }
}