import Widget from "./Widget.js";

export default class YoutubeWidget extends Widget {
    getHtmlId() {
        return "YoutubeWidget";
    }

    // get HTML to insert into content
    init() {
        super.init();

        var _this = this;
        var html = $('#YoutubeWidgetContent').html();
        var id = this.id;

        var div = $('<div>').html(html);
        div.find('.video-container').attr('id', id);

        this.contentHtml = div.html();
        this.innerHtml = div.find('.container').html();

        // before save events: remove placeholder before save
        currentEditor.addBeforeSaveEvent(function() {
            // find placeholder
            if (!_this.getPlaceholder().length) {
                return;
            }

            // find closest block element
            var blockElement = _this.getPlaceholder().closest('[builder-element="BlockElement"]');
            blockElement.remove();
        });
    }

    getPlaceholder() {
        return currentEditor.getIframeContent().find('#' + this.id + ' .video-placeholder');
    }

    events() {
        var _this = this;
        var loadYoutubeModal = function() {
            _this.youtubePopup = new PopUp(getI18n('youtube'), 'small');
            _this.youtubePopup.loadHtml(`
                <div id="popup-`+_this.id+`" class="container pb-3 youtube-popup">
                    <p class="py-2">`+getI18n('youtube.enter_youtube_url')+`:</p>
                    <input type="text" name="youtube_url" class="youtube_url mb-3">
                    <button class="btn btn-secondary youtube_save_button">`+getI18n('youtube.save')+`</button>
                </div>
            `);
        };

        $("#builder_iframe").contents().find("body").on('click', '#'+_this.id+' .button-add-youtube', function(e){
            loadYoutubeModal();
        });

        $(document).on('click', '#popup-'+_this.id+' .youtube_save_button', function(e){
            var url = $(this).closest('.youtube-popup').find('[name=youtube_url]').val();

            if (url == '') {
                alert(getI18n('youtube.please_enter_url'));
                return;
            }
            
            var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
            if(!url.match(p)){
                alert(getI18n('youtube.entered_url_not_valid'));
                return;
            }

            var code = url.match(p)[1];

            if (currentEditor.emailMode !== false) {
                $("#builder_iframe").contents().find("#" + _this.id).html(`
                    <div builder-element="YoutubeElement" data-code="`+code+`" class="position-relative" style="width:100%;
                        margin: -20px; padding: 20px;width: calc(100% + 40px);text-align:center;
                    ">
                        <svg style="
                            fill: #ffffff;
                            position: absolute;
                            display: block;
                            transform: scale(2);
                            top: calc(50% - 20px);
                            pointer-events: none;
                            opacity: 0.7;
                            left: calc(50% - 20px);
                        " xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M19.15 32.5 32.5 24 19.15 15.5ZM24 44Q19.9 44 16.25 42.425Q12.6 40.85 9.875 38.125Q7.15 35.4 5.575 31.75Q4 28.1 4 24Q4 19.9 5.575 16.25Q7.15 12.6 9.875 9.875Q12.6 7.15 16.25 5.575Q19.9 4 24 4Q28.1 4 31.75 5.575Q35.4 7.15 38.125 9.875Q40.85 12.6 42.425 16.25Q44 19.9 44 24Q44 28.1 42.425 31.75Q40.85 35.4 38.125 38.125Q35.4 40.85 31.75 42.425Q28.1 44 24 44ZM24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24Q24 24 24 24ZM24 41Q31 41 36 36Q41 31 41 24Q41 17 36 12Q31 7 24 7Q17 7 12 12Q7 17 7 24Q7 31 12 36Q17 41 24 41Z"/></svg>

                        <div class="ytb-link-container">
                            <a target="_blank" href="https://www.youtube.com/watch?v=`+code+`">
                                <img alt="Youtube Thumb Image" class="ytb-thumb" width="100%" height="auto" src="http://img.youtube.com/vi/`+code+`/hqdefault.jpg" width="100%" />
                            </a>
                        </div>
                    </div>
                `);
            } else {
                $("#builder_iframe").contents().find("#" + _this.id).html(`
                    <div builder-element="YoutubeElement" data-code="`+code+`" class="position-relative" style="width:100%;
                        margin: -20px; padding: 20px;width: calc(100% + 40px);text-align:center;
                    ">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/`+code+`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `);
            }
            _this.youtubePopup.hide();

            setTimeout(function() {
                currentEditor.selected.unselect()
            }, 100);
        });

        $("#builder_iframe").contents().find("body").on('click', '#'+_this.id+' a.remove-content-widget', function() {
            $(this).closest('[builder-element="BlockElement"]').remove();
        });
    }
}