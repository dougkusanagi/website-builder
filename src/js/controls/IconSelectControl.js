import Control from "./Control.js";

export default class IconSelectControl extends Control {
    groupId() {
        return 'action';
    }

    icons() {
        return {
            none: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/none.png" height="35" width="auto" />
                    </span>
                `,
            },
            facebook: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/facebook.png" height="35" width="auto" />
                    </span>
                `,
            },
            linkedin: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/linkedin.png" height="35" width="auto" />
                    </span>
                `,
            },
            youtube: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/youtube.png" height="35" width="auto" />
                    </span>
                `,
            },
            google_plus: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/google_plus.png" height="35" width="auto" />
                    </span>
                `,
            },
            twitter: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/twitter.png" height="35" width="auto" />
                    </span>
                `
            },
            instagram: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/instagram.png" height="35" width="auto" />
                    </span>
                `
            },
            tumblr: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/tumblr.png" height="35" width="auto" />
                    </span>
                `
            },
            line: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/line.png" height="35" width="auto" />
                    </span>
                `
            },
            wechat: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/wechat.png" height="35" width="auto" />
                    </span>
                `
            },
            weibo: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/weibo.png" height="35" width="auto" />
                    </span>
                `
            },
            tiktok: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/tiktok.png" height="35" width="auto" />
                    </span>
                `
            },
            pinterest: {
                html: `
                    <span class="social-icon">
                        <img alt="Social Icon Image" src="{{root}}image/icons/pinterest.png" height="35" width="auto" />
                    </span>
                `
            }
        };
    }

    getIconHtml(icon) {
        console.log(icon);
        return currentEditor.transformHtml(this.icons()[icon].html);
    }

    setIcon(icon) {
        // set icon
        $('.control-' + this.id + ' .icon').html(this.getIconHtml(icon));
        this.callback.setIconHtml(this.getIconHtml(icon));
        this.callback.setValue(icon);
    }

    renderHtml() {
        var thisControl = this;
        var options = this.value;
        var html = $('#IconSelectControl').html();
        
        html = html.replace("[TITLE]", this.title);
        html = html.replace("[ID]", this.id);
        
        var div = $('<DIV>').html(html);

        console.log(options.icon);

        // set control icon
        div.find('.control-' + this.id + ' .icon').html(this.getIconHtml(options.icon));
        div.find('.control-' + this.id + ' .url').attr('value', options.url);
        
        $(document).on('change', '.control-' + this.id + ' select', function() {
            var icon = $(this).val();

            thisControl.setIcon(icon);
        });

        $(document).on('change keyup', '.control-' + this.id + ' .url', function() {
            thisControl.callback.setUrl($(this).val());
        });

        $(document).on('click', '.control-' + this.id + ' .but-dup', function() {
            thisControl.callback.duplicate();
        });

        $(document).on('click', '.control-' + this.id + ' .but-remove', function() {
            thisControl.callback.remove();
        });
        
        return div.html();
    }

    afterRender() {
        // check if options has selected value
        $('.control-' + this.id + ' select option').attr('selected', false);
        console.log($('.control-' + this.id + ' select option[value="'+this.value.icon+'"]'));
        $('.control-' + this.id + ' select option[value="'+this.value.icon+'"]').prop('selected', true);
    }
}