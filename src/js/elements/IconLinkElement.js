import SuperElement from "./SuperElement.js";

export default class IconLinkElement extends SuperElement  {
    name() {
        return getI18n('icon');
    }
    icon() {
        return 'fal fa-font';
    }

    getAbsIconSrc() {
        var src = this.obj.find('img').attr('src');
        var url_image_selected_origin = $("#builder_iframe").get(0).contentWindow.location.origin;
        var url_image_selected_pathname = $("#builder_iframe").get(0).contentWindow.location.pathname;

        //show image selected
        // if image from tmp
        if (src.indexOf('/tmp') !== -1) {
            src = url_image_selected_origin + src;
        
        // if image is from local
        } else if(src[0] == '/') {
            src = src;
        
        // if image is outside link
        } else if(/^((http|https|ftp):\/\/)/.test(src)) {
            src = src;

        // if other
        } else {
            src = url_image_selected_pathname + src;
        }
        
        if (src.indexOf('data:') !== -1) {
            src = src;
        }

        return src;
    }

    getControls() {
        var element = this;

        return [
            new IconSelectControl(getI18n('icon'), {
                icon: element.obj.attr('data-value'),
                url: element.obj.attr('href')
            }, {
                setValue: function(icon) {
                    element.obj.attr('data-value', icon);
                },
                setIconHtml: function(html) {
                    element.obj.html(html);
                },
                setUrl: function(url) {
                    element.obj.attr('href', url);
                },
                duplicate: function() {
                    var td = element.obj.closest('td');
                    var copy = td.clone();

                    td.after(copy);

                    // select new icon
                    var e = currentEditor.elementFactory(copy.find('[builder-element=IconLinkElement]'));
                    currentEditor.select(e);
                    currentEditor.handleSelect();
                },
                remove: function() {

                    var td = element.obj.closest('td');
                    td.remove();

                    currentEditor.unselect();
                    currentEditor.hideControls();
                }
            })
        ];
    }
}