import Widget from "./Widget.js";

export default class ListImageWidget extends Widget {
    getHtmlId() {
        return "ListImageWidget";
    }

    name() {
        return getI18n('list_image');
    }

    icon() {
        return 'fal fa-images';
    }
    init() {
        super.init();
    }
}