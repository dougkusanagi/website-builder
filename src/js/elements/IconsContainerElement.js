import SuperElement from "./SuperElement.js";

export default class IconsContainerElement extends SuperElement {
    name() {
        return getI18n('container');
    }

    getControls() {
        var element = this;

        return [
            new IconsContainerControl(getI18n('icons_container'), { }, {
                addIcon: function() {
                    var icon = $(currentEditor.transformHtml(`
                        <td style="padding-right: 15px">
                            <a builder-element="IconLinkElement" data-value="none" href="" class="d-inline-block">
                                <span class="social-icon">
                                    <img src="{{root}}image/icons/none.png" height="35" width="auto" />
                                </span>
                            </a>
                        </td>
                    `));

                    // add new icon
                    element.obj.find('tr').append(icon);

                    // select new icon
                    var e = currentEditor.elementFactory(element.obj.find('[builder-element=IconLinkElement]').last());
                    currentEditor.select(e);
                    currentEditor.handleSelect();
                }
            }),
            new AlignmentControl('alignment', { align: element.obj.css('text-align') }, {
                setAlign: function(pos) {
                    element.obj.css('text-align', pos);
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