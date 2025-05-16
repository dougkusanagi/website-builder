import Widget from "./Widget.js";

export default class AudioWidget extends Widget {
    name() {
        return getI18n('widget.audio');
    }

    // get HTML to insert into content
    init() {
        super.init();

        // button html
        this.setButtonHtml(`
            <div class="_1content widget-text">
                <div class="panel__body woo-panel__body">
                    <div class="image-drag">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><rect x="0.5" y="0.5" width="35" height="35" rx="4.7" style="fill:#e2e1e2;stroke:#b7b7b8;stroke-miterlimit:10"/><path d="M16,27a3.8,3.8,0,0,1-2.8-1.2,3.9,3.9,0,0,1,0-5.6A3.8,3.8,0,0,1,16,19h1.1l.9.4V9h6v4H20V23a3.8,3.8,0,0,1-1.2,2.8A3.8,3.8,0,0,1,16,27Z" style="fill:#999"/></g></g></svg>
                        </div>
                    </div>
                    <div class="body__title">{language.widget.audio}</div>
                </div>
            </div>
        `);

        // content html
        this.setContentHtml(`
            <div builder-element="AudioElement">
                <div style="text-align:center">
                    <audio controls>
                        <source src="horse.ogg" type="audio/ogg">
                        <source src="horse.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div style="auto-placeholder">
                    <p class="" style="margin:0;padding:10px;text-align:center;color:#dc3545;">{language.widget.audio.upload_your_audio}</p>
                </div>
            </div>
        `);

        // default dragging html
        this.setDraggingHtml(`
            <div class="_1content widget-text">
                <div class="panel__body woo-panel__body">
                    <div class="image-drag">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78 53"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><rect x="1" y="1" width="27" height="51" rx="4.3" style="fill:#e2e1e2;stroke:#b7b7b8;stroke-miterlimit:10;stroke-width:2px"></rect><rect x="32" y="1" width="45" height="51" rx="4.3" style="fill:#e2e1e2;stroke:#b7b7b8;stroke-miterlimit:10;stroke-width:2px"></rect></g></g></svg>
                        </div>
                    </div>
                    <div class="body__title">2 columns</div>
                </div>
            </div>
        `);
    }

    events() {
    }

    afterDrop(block) {
        var element = currentEditor.elementFactory(block.find('[builder-element="AudioElement"]').first());
        
        currentEditor.select(element);
        currentEditor.handleSelect();
    }
}