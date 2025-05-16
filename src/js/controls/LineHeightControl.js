import Control from "./Control.js";

export default class LineHeightControl extends Control {
    groupId() {
        return 'general';
    }

    renderHtml() {
        var thisControl = this;
        var html = $('#LineHeightControl').html();
        html = html.replace("[ID]", thisControl.id);
        html = html.replace("[TITLE]", thisControl.title);

        return html;
    }

    afterRender() {
        var thisControl = this;
        thisControl.selector = function() {
            return $(".control-" + thisControl.id);
        };

        thisControl.selector().find('.icon-line-height').on('click', function(e) {
            var line_height = $(this).attr("line-height");

            $('.icon-line-height').removeClass('active');
            $(this).addClass('active');

            thisControl.callback(line_height);
        });
    }
}