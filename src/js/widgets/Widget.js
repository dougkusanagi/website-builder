export default class Widget {
    constructor(options) {
        this.id = makeid();
        this.options = {};

        // options 
        if (typeof(options) !== 'undefined') {
            this.options = options;
        }

        // init
        this.init();

        // load events
        this.events();
    }

    // START - DRAG & DROP INTERFACE ============

    // get drop HTML
    dropHtml() {
        return this.getContentHtml();
    }

    dragHtml() {
        return ''; // this.getDraggingHtml();
    }
    
    hasBlockContainer() {
        return false;
    }
    // END - DRAG & DROP INTERFACE ============

    getHtmlId() {
        return "None";
    }

    init() {
        // default button html
        if ($('#' + this.getHtmlId()).length) {
            this.setButtonHtml($('#' + this.getHtmlId()).html());
        }

        // default content html
        if ($('#' + this.getHtmlId()).length + getI18n('content')) {
            this.setContentHtml($('#' + this.getHtmlId() + 'Content').html());
        }

        // default dragging html
        if ($('#' + this.getHtmlId()).length) {
            this.setDraggingHtml($('#' + this.getHtmlId()).html());
        }
    }

    events() {

    }

    icon() {
        return 'fa fa-history';
    }

    // set button html control
    setButtonHtml(html) {
        this.buttonHtml = html;
    }

    // set HTML to insert into content
    setContentHtml(html) {
        this.contentHtml = html;
    }

    // set Html when dragging effect
    setDraggingHtml(html) {
        this.draggingHtml = html;
    }

    // get Html when dragging effect
    getDraggingHtml() {
        return this.draggingHtml;
    }

    // get button html control
    getButtonHtml() {
        return this.buttonHtml;
    }

    // get HTML to insert into content
    getContentHtml() {
        return this.contentHtml;
    }
}