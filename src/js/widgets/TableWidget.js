import Widget from "./Widget.js";

export default class TableWidget extends Widget {
    getHtmlId() {
        return "TableWidget";
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