// Rss Widget
class RssWidget extends Widget {
    getHtmlId() {
        return "RssWidget";
    }

    init() {
        var _this = this;

        // default button html
        this.setButtonHtml(`
            <div class="_1content widget-text">
                <div class="panel__body woo-panel__body">
                    <div class="image-drag">
                        <div ng-bind-html="::getModuleIcon(module)" class="ng-binding product-list-widget">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480.92 480.86"><g id="Layer_2" data-name="Layer 2"><g id="svg2989"><g id="g2991"><path id="path2993" d="M131.14,415.29q0,27.32-19.12,46.44T65.57,480.86q-27.31,0-46.44-19.13T0,415.29Q0,388,19.13,368.84t46.44-19.13q27.33,0,46.45,19.13T131.14,415.29Zm174.86,42a20.66,20.66,0,0,1-5.81,16.4,20.11,20.11,0,0,1-16.05,7.17H238a21.34,21.34,0,0,1-21.52-19.81q-7.52-78.21-63-133.71t-133.7-63A20.74,20.74,0,0,1,5.64,257.5,21,21,0,0,1,0,242.82V196.71a20.14,20.14,0,0,1,7.17-16.05,19.91,19.91,0,0,1,14.69-5.8h1.7a306.2,306.2,0,0,1,104.51,27.49,302.13,302.13,0,0,1,88.45,62,302,302,0,0,1,62,88.46A306.15,306.15,0,0,1,306,457.29Zm174.86.69a19.79,19.79,0,0,1-6.15,16A20.21,20.21,0,0,1,459,480.86H410.16a21.33,21.33,0,0,1-15.19-6,20.35,20.35,0,0,1-6.66-14.51,381.8,381.8,0,0,0-34.5-139.51q-30.39-66.09-79.06-114.75T160,127A386.86,386.86,0,0,0,20.49,92.21,20.43,20.43,0,0,1,6,85.55,20.89,20.89,0,0,1,0,70.69V21.86A20.2,20.2,0,0,1,6.83,6.15,20.45,20.45,0,0,1,21.86,0h1A473.93,473.93,0,0,1,194.15,41,478.7,478.7,0,0,1,339.47,141.39,479.13,479.13,0,0,1,439.88,286.7,473.93,473.93,0,0,1,480.86,458Z" style="fill:#b7b7b7"/></g></g></g></svg>
                        </div>
                    </div>
                    <div class="body__title">RSS</div>
                </div>
            </div>
        `);

        // default content html
        var config = Base64.encode(JSON.stringify({
            'url': '',
            'size': 10,
            'templates': {
                'FeedTitle': {
                    'title': 'Feed title',
                    'show': true,
                    'template': '@feed_title',
                },
                'FeedSubtitle': {
                    'title': 'Feed subtitle',
                    'show': true,
                    'template': 'Updated at: @feed_build_date',
                },
                'FeedTagdLine': {
                    'title': 'Feed tag line',
                    'show': true,
                    'template': 'TOP STORIES FOR YOU',
                },
                'ItemTitle': {
                    'title': 'Item title',
                    'show': true,
                    'template': 'Title: @item_title',
                },
                'ItemMeta': {
                    'title': 'Meta line',
                    'show': true,
                    'template': '<img src="/assets/image/avatar1.svg" width="30px" style="margin-right:5px" /> something here - @item_pubdate',
                },
                'ItemDescription': {
                    'title': 'Item description',
                    'show': true,
                    'template': '@item_description <a href="@item_url">Read more</a>',
                },
                'ItemStats': {
                    'title': 'State line',
                    'show': true,
                    'template': `<img src="/assets/image/icon-up.svg" width="16px" style="margin-right:5px" /> 400k updates, &nbsp; &nbsp; 
                        <img src="/assets/image/icon-comment.svg" width="16px" style="margin-right:5px" /> 1.2k comments`,
                },
                'ItemEnclosure': {
                    'title': 'Enclosure',
                    'show': false,
                    'template': '@item_enclosure',
                },
            },
        }));

        this.setContentHtml(`
            <div id="`+this.id+`"
                class="rss-widget"
                builder-element="RssElement"
                builder-draggable
                data-preview="no"
                data-config="`+config+`"
                data-action="`+this.options.handler+`"
            ></div>
        `);

        // default dragging html
        this.setDraggingHtml(this.getButtonHtml());

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
        return this.getElement().find('[f-role="placeholder"]');
    }

    getElement() {
        return currentEditor.getIframeContent().find('#' + this.id);
    }

    drop() {
        var element = currentEditor.elementFactory(this.getElement());

        currentEditor.select(element);
        currentEditor.handleSelect();

        element.render();
    }
}