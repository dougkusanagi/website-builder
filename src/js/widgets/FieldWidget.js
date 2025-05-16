import Widget from "./Widget.js";

export default class FieldWidget extends Widget {
    replaceTag (html) {
        var thisWidget = this;

        var name = thisWidget.field.name ? thisWidget.field.name : '';
        html = html.replace(/\[FIELD_ID\]/g, thisWidget.id);

        var name = thisWidget.field.name ? thisWidget.field.name : '';
        html = html.replace(/\[FIELD_NAME\]/g, name);

        var label = thisWidget.field.label ? thisWidget.field.label : '';
        html = html.replace(/\[FIELD_LABEL\]/g, label);

        var placeholder = thisWidget.field.placeholder ? thisWidget.field.placeholder : '';
        html = html.replace(/\[FIELD_PLACEHOLDER\]/g, placeholder);

        if(thisWidget.field.required == 1) {
            html = html.replace(/\[FIELD_REQUIRED\]/ig, 'required');
        } else {
            html = html.replace(/\[FIELD_REQUIRED\]/ig, '');
        }

        return html;
    }

    constructor(field) {
        super();

        var thisWidget = this;
        thisWidget.field = field;

        // update button html
        var html = thisWidget.getButtonHtml();
        html = thisWidget.replaceTag(html);
        thisWidget.setButtonHtml(html);

        // update content html
        var html = thisWidget.getContentHtml();
        html = thisWidget.replaceTag(html);
        thisWidget.setContentHtml(html);

        // update dragging html
        var html = thisWidget.getDraggingHtml();
        html = thisWidget.replaceTag(html);
        thisWidget.setDraggingHtml(html);
    }
}