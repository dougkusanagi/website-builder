import Widget from "./Widget.js";

export default class PricingTableWidget extends Widget {
    getHtmlId() {
        return "PricingTableWidget";
    }

    name() {
        return getI18n('pricing_table');
    }

    icon() {
        return 'fal fa-usd-circle';
    }
    init() {
        super.init();
    }
}