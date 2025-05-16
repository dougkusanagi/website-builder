import Widget from "./Widget.js";

export default class BlockqouteWidget extends Widget {
    getHtmlId() {
        return "BlockqouteWidget";
    }

    name() {
        return getI18n('blockqoute');
    }

    icon() {
        return 'fal fa-quote-right';
    }
    init() {
        super.init();
    }
}