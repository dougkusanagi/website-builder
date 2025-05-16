import Widget from "./Widget.js";

export default class DefinitionListWidget extends Widget {
    getHtmlId() {
        return "DefinitionListWidget";
    }

    name() {
        return getI18n('definition_list');
    }

    icon() {
        return 'fa fa-list-alt';
    }
    init() {
        super.init();
    }
}