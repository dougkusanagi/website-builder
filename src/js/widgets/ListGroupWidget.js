import Widget from "./Widget.js";

export default class ListGroupWidget extends Widget {
    getHtmlId() {
        return "ListGroupWidget";
    }

    name() {
        return getI18n('list_group');
    }

    icon() {
        return 'fal fa-list';
    }
    init() {
        super.init();
    }
}