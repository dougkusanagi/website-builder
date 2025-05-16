export default class Control {
    constructor(title, value, callback) {
        this.title = title;
        this.callback = callback;
        this.value = value;

        this.id = makeid();
    }

    groupId() {
      return 'general';
    }

    renderHtml() {
        return '<input type="file" value="" />';
    }
}