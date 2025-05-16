import SuperElement from "./SuperElement.js";

export default class AudioElement extends SuperElement  {
    name() {
        return getI18n('block');
    }

    setUrl(url) {
        this.obj.html(`
            <div style="text-align:center">
                <audio controls>
                    <source src="`+url+`" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `);
    }

    getControls() {
        var element = this;

        return [
            new AudioControl(getI18n('language.widget.audio'), {
                
            }, {
                setUrl: function(url) {
                    element.setUrl(url);
                    currentEditor.select(element);
                }
            })
        ];
    }
}