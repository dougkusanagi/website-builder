import SuperElement from "./SuperElement.js";

export default class YoutubeElement extends SuperElement  {
    name() {
        return getI18n('block');
    }

    getControls() {
        var element = this;

        return [
            new YoutubeControl(getI18n('youtube'), {
                code: element.obj.attr('data-code'),
                width: element.obj.find('iframe').length ? element.obj.find('iframe').attr('width') : element.obj.find('.ytb-thumb').attr('width'),
                height: element.obj.find('iframe').length ? element.obj.find('iframe').attr('height') : element.obj.find('.ytb-thumb').attr('height'),
                alignment: element.obj.css('text-align')
            }, {
                setCode: function(code) {
                    if (element.obj.find('iframe').length) {
                        element.obj.html(`
                            <iframe width="`+element.obj.find('iframe').attr('width')+`" height="`+element.obj.find('iframe').attr('height')+`" src="https://www.youtube.com/embed/`+code+`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `);
                    } else {
                        element.obj.find('.ytb-link-container').html(`
                            <a target="_blank" href="https://www.youtube.com/watch?v=`+code+`">
                                <img class="ytb-thumb" width="100%" height="auto" src="http://img.youtube.com/vi/`+code+`/hqdefault.jpg" width="100%" />
                            </a>
                        `);
                    }
                    currentEditor.select(element);
                },
                setWidth: function(width) {
                    if (element.obj.find('iframe').length) {
                        element.obj.find('iframe').attr('width', width);
                    } else {
                        element.obj.find('.ytb-thumb').attr('width', width);
                    }
                    currentEditor.select(element);
                },
                setHeight: function(height) {
                    if (element.obj.find('iframe').length) {
                        element.obj.find('iframe').attr('height', height);
                    } else {
                        element.obj.find('.ytb-thumb').attr('height', height);
                    }
                    currentEditor.select(element);
                },
                setAlignment: function(alignment) {
                    element.obj.css('text-align', alignment);
                    currentEditor.select(element);
                }
            }),
            new MobileDesktopToggleControl(getI18n('toogle'), {
                type: element.obj.attr('data-hide-on')
            }, function(type) {
                element.obj.attr('data-hide-on', type);
                setTimeout(function() {
                    currentEditor.select(element);
                }, 100);
            }),
        ];
    }
}