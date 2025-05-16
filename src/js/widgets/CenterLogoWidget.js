// Center Logo
import Widget from "./Widget.js";

export default class CenterLogoWidget extends Widget {
    getHtmlId() {
        return "CenterLogoWidget";
    }
}
window.CenterLogoWidget = CenterLogoWidget;