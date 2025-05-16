import Widget from "./Widget.js";

export default class ImageWidget extends Widget {
    getHtmlId() {
        return "ImageWidget";
    }
    name() {
        return getI18n('image');
    }
    icon() {
        return 'fal fa-image';
    }

    // get HTML to insert into content
    init() {
        var _this = this;

        super.init();

        var html = $('#ImageWidgetContent').html();
        var id = this.id;

        var div = $('<div>').html(html);
        div.find('.image-container').attr('id', id);

        this.contentHtml = div.html();

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
        return currentEditor.getIframeContent().find('#' + this.id);
    }

    events() {
        var _this = this;
        var id = this.id;

        function showImagePopup(tab = "upload") {
            var imagePopup = new PopUp(getI18n('change_image'), 'auto');
            var contentPopup = '<div id="image-popup-'+id+'">' + $('#ImageToolbox').html() + '</div>';
            if ( tab == "upload") {
                imagePopup.loadHtml(contentPopup);
                $('.nav-content').removeClass('active');
                $('.nav-tab').removeClass('active');
                setTimeout(function() {
                    $('#home').addClass('active show');
                    $('.home').addClass('active');      
                }, 100);
            }
            else if ( tab == "url") {
                imagePopup.loadHtml(contentPopup);
                $('.nav-content').removeClass('active');
                $('.nav-tab').removeClass('active');
                $('#menu1').addClass('active show');
                $('.menu1').addClass('active');
            }
            else if ( tab == "base64") {
                imagePopup.loadHtml(contentPopup);
                $('.nav-content').removeClass('active');
                $('.nav-tab').removeClass('active');
                $('#menu2').addClass('active show');
                $('.menu2').addClass('active');
            }
            else if ( tab == "filemanager") {
                imagePopup.loadHtml(contentPopup);
                $('.nav-content').removeClass('active');
                $('.nav-tab').removeClass('active');
                $('#menu3').addClass('active show');
                $('.menu3').addClass('active');
            }

            // filemanager callback
            window.filemanager_callback = function(url) {
                var idContent = _this.currentPlaceholder;
                var image = $('<img id="'+id+'" builder-element class="" src="'+ url +'" style="width: 100%;"/>');
                idContent.after(image);
                idContent.remove();
                var popup = new PopUp();
                popup.hide();

                //
                setTimeout(() => {
                    var element = currentEditor.elementFactory(image);
                    currentEditor.select(element);
                    currentEditor.handleSelect();
                }, 500);
                    
            };

            // file manager
            if (typeof($('.modal-content .filemanager-iframe').attr('src')) == 'undefined' && currentEditor.filemanager) {
                $('.modal-content .filemanager-iframe').prop('src', currentEditor.filemanager);
            }
        }

        function saveImageUpload() {
            var image = $('input[name="file_upload_image"]')[0].files[0];
            var type = 'upload';
            var idContent = _this.currentPlaceholder;
            var formData = new FormData();
            formData.append('file', image);
            formData.append('_token', CSRF_TOKEN);
            formData.append('assetType', type);

            if (currentEditor.data !== null) {
                for ( var key in currentEditor.data ) {
                   formData.append(key, currentEditor.data[key]);
               }
            }

            // check file selected
            if (!$('input[name="file_upload_image"]').val()) {
                Swal.fire({
                    title: getI18n('error_job'),
                    text: getI18n('no_file_selected'),
                    type: "error",
                }).then((result) => {
                });
                return;
            }

            var requestMethod = currentEditor.uploadAssetMethod;
            var notSupportedMethods = [ 'PUT', 'PATCH', 'TRACE', 'OPTIONS', 'DELETE', 'HEAD', 'CONNECT' ];
            if (notSupportedMethods.includes( requestMethod.toUpperCase())) {
                requestMethod = 'POST';
            }
            formData.append('_method', requestMethod);

            idContent.html('<div class="loader"></div>');

            $.ajax({
                url: currentEditor.uploadAssetUrl,
                type: currentEditor.uploadAssetMethod,
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
            }).done(function(data, textStatus, jqXHR) { // jqXHR.status == 200
                if (jqXHR.status == 200) {
                    var img = $('<img builder-element class="" src="'+ data.url +'" style="width: 100%;"/>');
                    idContent.after(img);
                    idContent.remove();
                    var popup = new PopUp();
                    popup.hide();
                    $('p.file-upload-input-title span.des-upload').text(getI18n('drag_click'));

                    img[0].onload = function() {
                        var element = currentEditor.elementFactory(img);
                        currentEditor.select(element);
                        currentEditor.handleSelect();
                    };
                } else {
                    // Tr ve form voi error messaqge ==> thanh cong 200!
                    alert(jqXHR.responseText);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) { // jqXHR.status = 5xx hoac 4xx
                var json = $.parseJSON(jqXHR.responseText);
                alert(getI18n('error_upload_file') + json.error.file[0]);
                idContent.html(html);
            });
        }

        function saveImageUrl() {
            var url = $('input[name="url_image"]').val();
            var type = 'url';
            var idContent = _this.currentPlaceholder;
            var formData = new FormData();
            formData.append('url', url);
            formData.append('_token', CSRF_TOKEN);
            formData.append('assetType', type);

            if (currentEditor.data !== null) {
                for ( var key in currentEditor.data ) {
                   formData.append(key, currentEditor.data[key]);
               }
            }

            var requestMethod = currentEditor.uploadAssetMethod;
            var notSupportedMethods = [ 'PUT', 'PATCH', 'TRACE', 'OPTIONS', 'DELETE', 'HEAD', 'CONNECT' ];
            if (notSupportedMethods.includes( requestMethod.toUpperCase())) {
                requestMethod = 'POST';
            }
            formData.append('_method', requestMethod);

            idContent.html('<div class="loader"></div>');

            $.ajax({
                url: currentEditor.uploadAssetUrl,
                type: currentEditor.uploadAssetMethod,
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
            }).done(function(data, textStatus, jqXHR) { // jqXHR.status == 200
                if (jqXHR.status == 200) {
                    var img = $('<img builder-element class="" src="'+ data.url +'" style="width: 100%;"/>');
                    idContent.after(img);
                    idContent.remove();
                    var popup = new PopUp();
                    popup.hide();

                    img[0].onload = function() {
                        var element = currentEditor.elementFactory(img);
                        currentEditor.select(element);
                        currentEditor.handleSelect();
                    };
                } else {
                    // Tr ve form voi error messaqge ==> thanh cong 200!
                    alert(jqXHR.responseText);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) { // jqXHR.status = 5xx hoac 4xx
                alert(jqXHR.responseText);
            });
        }

        function saveImageBase64() {
            var url = $('[name="base64_image"]').val();
            var type = 'base64';
            var idContent = _this.currentPlaceholder;
            var formData = new FormData();
            formData.append('url_base64', url);
            formData.append('_token', CSRF_TOKEN);
            formData.append('assetType', type);

            if (currentEditor.data !== null) {
                for ( var key in currentEditor.data ) {
                   formData.append(key, currentEditor.data[key]);
               }
            }

            var requestMethod = currentEditor.uploadAssetMethod;
            var notSupportedMethods = [ 'PUT', 'PATCH', 'TRACE', 'OPTIONS', 'DELETE', 'HEAD', 'CONNECT' ];
            if (notSupportedMethods.includes( requestMethod.toUpperCase())) {
                requestMethod = 'POST';
            }
            formData.append('_method', requestMethod);

            idContent.html('<div class="loader"></div>');

            $.ajax({
                url: currentEditor.uploadAssetUrl,
                type: currentEditor.uploadAssetMethod,
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
            }).done(function(data, textStatus, jqXHR) { // jqXHR.status == 200
                if (jqXHR.status == 200) {
                    var img = $('<img builder-element class="" src="'+ data.url +'" style="width: 100%;"/>');
                    idContent.after(img);
                    idContent.remove();
                    var popup = new PopUp();
                    popup.hide();

                    img[0].onload = function() {
                        var element = currentEditor.elementFactory(img);
                        currentEditor.select(element);
                        currentEditor.handleSelect();
                    };
                } else {
                    // Tr ve form voi error messaqge ==> thanh cong 200!
                    alert(jqXHR.responseText);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) { // jqXHR.status = 5xx hoac 4xx
                var json = $.parseJSON(jqXHR.responseText);
                alert(getI18n('error_upload_base64') + json.error.url_base64[0]);
                idContent.html(html);
            });
        }

        // Event click brower image
        $("#builder_iframe").contents().find("body").on('click', '#'+id+' .browse-btn', function() {
            _this.currentPlaceholder = $(this).closest('.image-container');
            showImagePopup("upload");
        });

        $(document).on('change', 'input[name="file_upload_image"]', function(e){
            var fileName = e.target.files[0].name;
            $('p.file-upload-input-title span.des-upload').text(fileName);
        });

        //change image, video
        $(document).on('click', '#image-popup-'+id+' button.buttonSaveUpload', function(e) {
            e.preventDefault();

            saveImageUpload();
        });

        // .... form submit
        $(document).on('click', '#image-popup-'+id+' button.buttonSaveUrl', function(e) {
            e.preventDefault();

            saveImageUrl();
        });

        // .... form submit
        $(document).on('click', '#image-popup-'+id+' button.buttonSaveBase64', function(e) {
            e.preventDefault();

            saveImageBase64();
        });

        $("#builder_iframe").contents().find("body").on('click', '#'+id+' a.remove-content-widget', function() {
            $(this).closest('[builder-element="BlockElement"]').remove();
        });
    }
}