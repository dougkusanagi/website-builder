import Widget from "./Widget.js";

export default class Table5Widget extends Widget {
    getHtmlId() {
        return "Table5Widget";
    }

    name() {
        return getI18n('table');
    }

    icon() {
        return 'fal fa-table';
    }
    init() {
        super.init();
    }
}