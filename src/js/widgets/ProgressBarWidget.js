import Widget from "./Widget.js";

export default class ProgressBarWidget extends Widget {
    getHtmlId() {
        return "ProgressBarWidget";
    }

    name() {
        return getI18n('progress_bar');
    }

    icon() {
        return 'fal fa-percent';
    }
    init() {
        super.init();
    }
}