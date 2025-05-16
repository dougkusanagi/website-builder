import Widget from "./Widget.js";

export default class JumbotronWidget extends Widget {
    getHtmlId() {
        return "JumbotronWidget";
    }

    name() {
        return getI18n('jumbotron');
    }

    icon() {
        return 'fal fa-pager';
    }
    init() {
        super.init();
    }
}