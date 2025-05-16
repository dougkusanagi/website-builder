import Control from "./Control.js";

export default class AudioControl extends Control {
    renderHtml() {
        var thisControl = this;
        var html = `
            <div class="control-[ID]">
                <div class="widget-row px-3 py-2">
                    <h4>{language.widget.audio}</h4>
                    <p class="mb-2">{language.audio.upload_audio_file}</p>
                    <form action="upload_audio.php" method="post" enctype="multipart/form-data">
                        <div class="d-flex algin-items-center">
                            <div class="place-value me-3 mr-3">
                                <span class="">
                                    <input type="hidden" name="assetType" value="audio" />
                                    <input style="
                                        width: 100%;
                                        height: 35px;
                                        display: flex;
                                        align-items: center;
                                        line-height: 25px;
                                    " type="file" name="file" class="" value="" style="width:100%"  accept=".mp3,audio/*" required />
                                </span>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary">{language.upload}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
        thisControl.selector = function() {
            return $(".control-" + thisControl.id);
        };

        html = html.replace("[ID]", thisControl.id);

        var div = $('<DIV>').html(html);
        
        return div.html();
    }

    getForm() {
        return this.selector().find('form');
    }

    getFileInput() {
        return this.selector().find('inpyt[type="file"]');
    }

    upload() {

    }

    getSubmitButton() {
        return this.selector().find('[type="submit"]');
    }

    afterRender() {
        var _this = this;

        this.getForm().on('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(this);
            formData.append('_token', CSRF_TOKEN);

            $.ajax({
                type: "POST",
                url: currentEditor.uploadAssetUrl,
                method: currentEditor.uploadAssetMethod,
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    _this.callback.setUrl(response.url);
                    _this.getFileInput().val('');
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }
}