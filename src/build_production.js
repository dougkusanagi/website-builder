const iconStyle = 'default';
const inlineEditor = 'tinymce';

import beautify from 'js-beautify';
window.beautify = beautify;

// jquery
import jQuery from './lib/jquery-3.4.1.min.js';
window.jQuery = jQuery;
window.$ = jQuery;

// bootstrapGrowl
require('./lib/jquery.bootstrap-growl.min.js');

window.bootstrapGrowl = $.bootstrapGrowl;

// bootstrap
require('./lib/popper.js');
require('./lib/bootstrap/bootstrap.min.css');
require('./lib/bootstrap/bootstrap.min.js');

// fontawesome free
require('./lib/fontawesome-free/css/fontawesome.min.css');
require('./lib/fontawesome-free/css/brands.min.css');
require('./lib/fontawesome-free/css/solid.min.css');

// main css/scss
require('./css/font.css');
require('./css/app.css');
require('./css/builder_core.css');
require('./css/fix.css');

require('./js/themewp.js');
require('./css/themewp.css');

// add all widgets from js/widgets
import Widget from "./js/widgets/Widget.js";
window.Widget = Widget;
import FieldWidget from "./js/widgets/FieldWidget.js";
window.FieldWidget = FieldWidget;
import BlockqouteWidget from "./js/widgets/BlockqouteWidget.js";
window.BlockqouteWidget = BlockqouteWidget;
import BoxedTextWidget from "./js/widgets/BoxedTextWidget.js";
window.BoxedTextWidget = BoxedTextWidget;
import Button2Widget from "./js/widgets/Button2Widget.js";
window.Button2Widget = Button2Widget;
import ButtonGroupWidget from "./js/widgets/ButtonGroupWidget.js";
window.ButtonGroupWidget = ButtonGroupWidget;
import ButtonToolbarWidget from "./js/widgets/ButtonToolbarWidget.js";
window.ButtonToolbarWidget = ButtonToolbarWidget;
import ButtonWidget from "./js/widgets/ButtonWidget.js";
window.ButtonWidget = ButtonWidget;
import CenterLogoWidget from "./js/widgets/CenterLogoWidget.js";
window.CenterLogoWidget = CenterLogoWidget;
import CheckboxFieldWidget from "./js/widgets/CheckboxFieldWidget.js";
window.CheckboxFieldWidget = CheckboxFieldWidget;
import CheckboxWidget from "./js/widgets/CheckboxWidget.js";
window.CheckboxWidget = CheckboxWidget;
import ContainerWidget from "./js/widgets/ContainerWidget.js";
window.ContainerWidget = ContainerWidget;
import CustomWidget from "./js/widgets/CustomWidget.js";
window.CustomWidget = CustomWidget;
import DateFieldWidget from "./js/widgets/DateFieldWidget.js";
window.DateFieldWidget = DateFieldWidget;
import DatetimeFieldWidget from "./js/widgets/DatetimeFieldWidget.js";
window.DatetimeFieldWidget = DatetimeFieldWidget;
import DefinitionListWidget from "./js/widgets/DefinitionListWidget.js";
window.DefinitionListWidget = DefinitionListWidget;
import DivContainerWidget from "./js/widgets/DivContainerWidget.js";
window.DivContainerWidget = DivContainerWidget;
import DividerWidget from "./js/widgets/DividerWidget.js";
window.DividerWidget = DividerWidget;
import DropdownFieldWidget from "./js/widgets/DropdownFieldWidget.js";
window.DropdownFieldWidget = DropdownFieldWidget;
import EmailFieldWidget from "./js/widgets/EmailFieldWidget.js";
window.EmailFieldWidget = EmailFieldWidget;
import FooterBlockWidget from "./js/widgets/FooterBlockWidget.js";
window.FooterBlockWidget = FooterBlockWidget;
import FooterWidget from "./js/widgets/FooterWidget.js";
window.FooterWidget = FooterWidget;
import FormGroupWidget from "./js/widgets/FormGroupWidget.js";
window.FormGroupWidget = FormGroupWidget;
import FormWidget from "./js/widgets/FormWidget.js";
window.FormWidget = FormWidget;
import FourRow3333Widget from "./js/widgets/FourRow3333Widget.js";
window.FourRow3333Widget = FourRow3333Widget;
import HeaderBlockWidget from "./js/widgets/HeaderBlockWidget.js";
window.HeaderBlockWidget = HeaderBlockWidget;
import HeaderWidget from "./js/widgets/HeaderWidget.js";
window.HeaderWidget = HeaderWidget;
import HeadingWidget from "./js/widgets/HeadingWidget.js";
window.HeadingWidget = HeadingWidget;
import HeroImageWidget from "./js/widgets/HeroImageWidget.js";
window.HeroImageWidget = HeroImageWidget;
import HtmlWidget from "./js/widgets/HtmlWidget.js";
window.HtmlWidget = HtmlWidget;
import ImageCaptionWidget from "./js/widgets/ImageCaptionWidget.js";
window.ImageCaptionWidget = ImageCaptionWidget;
import ImageGridWidget from "./js/widgets/ImageGridWidget.js";
window.ImageGridWidget = ImageGridWidget;
import ImageHeaderWidget from "./js/widgets/ImageHeaderWidget.js";
window.ImageHeaderWidget = ImageHeaderWidget;
import ImageWidget from "./js/widgets/ImageWidget.js";
window.ImageWidget = ImageWidget;
import InputFieldWidget from "./js/widgets/InputFieldWidget.js";
window.InputFieldWidget = InputFieldWidget;
import InputGroupWidget from "./js/widgets/InputGroupWidget.js";
window.InputGroupWidget = InputGroupWidget;
import IntroBlockWidget from "./js/widgets/IntroBlockWidget.js";
window.IntroBlockWidget = IntroBlockWidget;
import IpFieldWidget from "./js/widgets/IpFieldWidget.js";
window.IpFieldWidget = IpFieldWidget;
import JumbotronWidget from "./js/widgets/JumbotronWidget.js";
window.JumbotronWidget = JumbotronWidget;
import LinkWidget from "./js/widgets/LinkWidget.js";
window.LinkWidget = LinkWidget;
import ListGroupWidget from "./js/widgets/ListGroupWidget.js";
window.ListGroupWidget = ListGroupWidget;
import ListImageWidget from "./js/widgets/ListImageWidget.js";
window.ListImageWidget = ListImageWidget;
import MarkedTextWidget from "./js/widgets/MarkedTextWidget.js";
window.MarkedTextWidget = MarkedTextWidget;
import MediaObjectWidget from "./js/widgets/MediaObjectWidget.js";
window.MediaObjectWidget = MediaObjectWidget;
import MeterialWidget from "./js/widgets/MeterialWidget.js";
window.MeterialWidget = MeterialWidget;
import MultiselectFieldWidget from "./js/widgets/MultiselectFieldWidget.js";
window.MultiselectFieldWidget = MultiselectFieldWidget;
import NavbarWidget from "./js/widgets/NavbarWidget.js";
window.NavbarWidget = NavbarWidget;
import NumberFieldWidget from "./js/widgets/NumberFieldWidget.js";
window.NumberFieldWidget = NumberFieldWidget;
import OneColumnBlockWidget from "./js/widgets/OneColumnBlockWidget.js";
window.OneColumnBlockWidget = OneColumnBlockWidget;
import OneRowWidget from "./js/widgets/OneRowWidget.js";
window.OneRowWidget = OneRowWidget;
import PanelWidget from "./js/widgets/PanelWidget.js";
window.PanelWidget = PanelWidget;
import ParagraphWidget from "./js/widgets/ParagraphWidget.js";
window.ParagraphWidget = ParagraphWidget;
import PricingTableWidget from "./js/widgets/PricingTableWidget.js";
window.PricingTableWidget = PricingTableWidget;
import ProgressBarWidget from "./js/widgets/ProgressBarWidget.js";
window.ProgressBarWidget = ProgressBarWidget;
import RadioFieldWidget from "./js/widgets/RadioFieldWidget.js";
window.RadioFieldWidget = RadioFieldWidget;
import RatingFieldWidget from "./js/widgets/RatingFieldWidget.js";
window.RatingFieldWidget = RatingFieldWidget;
import SelectWidget from "./js/widgets/SelectWidget.js";
window.SelectWidget = SelectWidget;
import ServicesListWidget from "./js/widgets/ServicesListWidget.js";
window.ServicesListWidget = ServicesListWidget;
import SocialLinksBlockWidget from "./js/widgets/SocialLinksBlockWidget.js";
window.SocialLinksBlockWidget = SocialLinksBlockWidget;
import SocialWidget from "./js/widgets/SocialWidget.js";
window.SocialWidget = SocialWidget;
import SubmitButtonWidget from "./js/widgets/SubmitButtonWidget.js";
window.SubmitButtonWidget = SubmitButtonWidget;
import Table4Widget from "./js/widgets/Table4Widget.js";
window.Table4Widget = Table4Widget;
import Table5Widget from "./js/widgets/Table5Widget.js";
window.Table5Widget = Table5Widget;
import TableWidget from "./js/widgets/TableWidget.js";
window.TableWidget = TableWidget;
import TextAreaWidget from "./js/widgets/TextAreaWidget.js";
window.TextAreaWidget = TextAreaWidget;
import TextFieldWidget from "./js/widgets/TextFieldWidget.js";
window.TextFieldWidget = TextFieldWidget;
import TextWidget from "./js/widgets/TextWidget.js";
window.TextWidget = TextWidget;
import TextareaFieldWidget from "./js/widgets/TextareaFieldWidget.js";
window.TextareaFieldWidget = TextareaFieldWidget;
import ThreeColumnsBlockWidget from "./js/widgets/ThreeColumnsBlockWidget.js";
window.ThreeColumnsBlockWidget = ThreeColumnsBlockWidget;
import ThreeColumnsWidget from "./js/widgets/ThreeColumnsWidget.js";
window.ThreeColumnsWidget = ThreeColumnsWidget;
import ThreeRow444Widget from "./js/widgets/ThreeRow444Widget.js";
window.ThreeRow444Widget = ThreeRow444Widget;
import TwoArticlesBlockWidget from "./js/widgets/TwoArticlesBlockWidget.js";
window.TwoArticlesBlockWidget = TwoArticlesBlockWidget;
import TwoArticlesRTLBlockWidget from "./js/widgets/TwoArticlesRTLBlockWidget.js";
window.TwoArticlesRTLBlockWidget = TwoArticlesRTLBlockWidget;
import TwoColumnsBlockWidget from "./js/widgets/TwoColumnsBlockWidget.js";
window.TwoColumnsBlockWidget = TwoColumnsBlockWidget;
import TwoColumnsWidget from "./js/widgets/TwoColumnsWidget.js";
window.TwoColumnsWidget = TwoColumnsWidget;
import TwoRow48Widget from "./js/widgets/TwoRow48Widget.js";
window.TwoRow48Widget = TwoRow48Widget;
import TwoRow66Widget from "./js/widgets/TwoRow66Widget.js";
window.TwoRow66Widget = TwoRow66Widget;
import TwoRow84Widget from "./js/widgets/TwoRow84Widget.js";
window.TwoRow84Widget = TwoRow84Widget;
import UnorderedListWidget from "./js/widgets/UnorderedListWidget.js";
window.UnorderedListWidget = UnorderedListWidget;
import UserProfileWidget from "./js/widgets/UserProfileWidget.js";
window.UserProfileWidget = UserProfileWidget;
import VideoWidget from "./js/widgets/VideoWidget.js";
window.VideoWidget = VideoWidget;
import WellWidget from "./js/widgets/WellWidget.js";
window.WellWidget = WellWidget;
import YoutubeWidget from "./js/widgets/YoutubeWidget.js";
window.YoutubeWidget = YoutubeWidget;
import AudioWidget from "./js/widgets/AudioWidget.js";
window.AudioWidget = AudioWidget;

// add all elements from js/elements
import SuperElement from "./js/elements/SuperElement.js";
window.SuperElement = SuperElement;
import AElement from "./js/elements/AElement.js";
window.AElement = AElement;
import DivElement from "./js/elements/DivElement.js";
window.DivElement = DivElement;
import IconLinkElement from "./js/elements/IconLinkElement.js";
window.IconLinkElement = IconLinkElement;
import PElement from "./js/elements/PElement.js";
window.PElement = PElement;
import TableBlockElement from "./js/elements/TableBlockElement.js";
window.TableBlockElement = TableBlockElement;
import BlockElement from "./js/elements/BlockElement.js";
window.BlockElement = BlockElement;
import DividerElement from "./js/elements/DividerElement.js";
window.DividerElement = DividerElement;
import IconsContainerElement from "./js/elements/IconsContainerElement.js";
window.IconsContainerElement = IconsContainerElement;
import PageElement from "./js/elements/PageElement.js";
window.PageElement = PageElement;
import TextElement from "./js/elements/TextElement.js";
window.TextElement = TextElement;
import ButtonElement from "./js/elements/ButtonElement.js";
window.ButtonElement = ButtonElement;
import DropdownElement from "./js/elements/DropdownElement.js";
window.DropdownElement = DropdownElement;
import ImgElement from "./js/elements/ImgElement.js";
window.ImgElement = ImgElement;
import PricingItemElement from "./js/elements/PricingItemElement.js";
window.PricingItemElement = PricingItemElement;
import TextFieldElement from "./js/elements/TextFieldElement.js";
window.TextFieldElement = TextFieldElement;
import CellContainerElement from "./js/elements/CellContainerElement.js";
window.CellContainerElement = CellContainerElement;
import DropdownFieldElement from "./js/elements/DropdownFieldElement.js";
window.DropdownFieldElement = DropdownFieldElement;
import IpFieldElement from "./js/elements/IpFieldElement.js";
window.IpFieldElement = IpFieldElement;
import PricingTableElement from "./js/elements/PricingTableElement.js";
window.PricingTableElement = PricingTableElement;
import TextareaFieldElement from "./js/elements/TextareaFieldElement.js";
window.TextareaFieldElement = TextareaFieldElement;
import CellElement from "./js/elements/CellElement.js";
window.CellElement = CellElement;
import EmailFieldElement from "./js/elements/EmailFieldElement.js";
window.EmailFieldElement = EmailFieldElement;
import MultiselectFieldElement from "./js/elements/MultiselectFieldElement.js";
window.MultiselectFieldElement = MultiselectFieldElement;
import RadioFieldElement from "./js/elements/RadioFieldElement.js";
window.RadioFieldElement = RadioFieldElement;
import VideoElement from "./js/elements/VideoElement.js";
window.VideoElement = VideoElement;
import CheckboxElement from "./js/elements/CheckboxElement.js";
window.CheckboxElement = CheckboxElement;
import FormElement from "./js/elements/FormElement.js";
window.FormElement = FormElement;
import NoneElement from "./js/elements/NoneElement.js";
window.NoneElement = NoneElement;
import RatingFieldElement from "./js/elements/RatingFieldElement.js";
window.RatingFieldElement = RatingFieldElement;
import YoutubeElement from "./js/elements/YoutubeElement.js";
window.YoutubeElement = YoutubeElement;
import CheckboxFieldElement from "./js/elements/CheckboxFieldElement.js";
window.CheckboxFieldElement = CheckboxFieldElement;
import HeadingElement from "./js/elements/HeadingElement.js";
window.HeadingElement = HeadingElement;
import NumberFieldElement from "./js/elements/NumberFieldElement.js";
window.NumberFieldElement = NumberFieldElement;
import SpanElement from "./js/elements/SpanElement.js";
window.SpanElement = SpanElement;
import DateFieldElement from "./js/elements/DateFieldElement.js";
window.DateFieldElement = DateFieldElement;
import HtmlElement from "./js/elements/HtmlElement.js";
window.HtmlElement = HtmlElement;
import OtherElement from "./js/elements/OtherElement.js";
window.OtherElement = OtherElement;
import AudioElement from "./js/elements/AudioElement.js";
window.AudioElement = AudioElement;

// add all controls from js/controls
import Control from "./js/controls/Control.js";
window.Control = Control;
import ActionButtonControl from "./js/controls/ActionButtonControl.js";
window.ActionButtonControl = ActionButtonControl;
import ActionControl from "./js/controls/ActionControl.js";
window.ActionControl = ActionControl;
import AlignmentControl from "./js/controls/AlignmentControl.js";
window.AlignmentControl = AlignmentControl;
import BackgroundControl from "./js/controls/BackgroundControl.js";
window.BackgroundControl = BackgroundControl;
import BackgroundImageControl from "./js/controls/BackgroundImageControl.js";
window.BackgroundImageControl = BackgroundImageControl;
import BlockOptionControl from "./js/controls/BlockOptionControl.js";
window.BlockOptionControl = BlockOptionControl;
import ButtonControl from "./js/controls/ButtonControl.js";
window.ButtonControl = ButtonControl;
import ButtonOptionControl from "./js/controls/ButtonOptionControl.js";
window.ButtonOptionControl = ButtonOptionControl;
import CaptchaToggleControl from "./js/controls/CaptchaToggleControl.js";
window.CaptchaToggleControl = CaptchaToggleControl;
import CellOptionControl from "./js/controls/CellOptionControl.js";
window.CellOptionControl = CellOptionControl;
import CheckboxAssociateControl from "./js/controls/CheckboxAssociateControl.js";
window.CheckboxAssociateControl = CheckboxAssociateControl;
import ColorPickerControl from "./js/controls/ColorPickerControl.js";
window.ColorPickerControl = ColorPickerControl;
import CommonFieldControl from "./js/controls/CommonFieldControl.js";
window.CommonFieldControl = CommonFieldControl;
import DivOptionControl from "./js/controls/DivOptionControl.js";
window.DivOptionControl = DivOptionControl;
import DropdownAssociateControl from "./js/controls/DropdownAssociateControl.js";
window.DropdownAssociateControl = DropdownAssociateControl;
import FieldListHeaderControl from "./js/controls/FieldListHeaderControl.js";
window.FieldListHeaderControl = FieldListHeaderControl;
import FieldOptionsControl from "./js/controls/FieldOptionsControl.js";
window.FieldOptionsControl = FieldOptionsControl;
import FontFamilyControl from "./js/controls/FontFamilyControl.js";
window.FontFamilyControl = FontFamilyControl;
import FormControl from "./js/controls/FormControl.js";
window.FormControl = FormControl;
import HeadingControl from "./js/controls/HeadingControl.js";
window.HeadingControl = HeadingControl;
import HtmlOptionControl from "./js/controls/HtmlOptionControl.js";
window.HtmlOptionControl = HtmlOptionControl;
import IconSelectControl from "./js/controls/IconSelectControl.js";
window.IconSelectControl = IconSelectControl;
import IconsContainerControl from "./js/controls/IconsContainerControl.js";
window.IconsContainerControl = IconsContainerControl;
import ImageControl from "./js/controls/ImageControl.js";
window.ImageControl = ImageControl;
import ImageLinkControl from "./js/controls/ImageLinkControl.js";
window.ImageLinkControl = ImageLinkControl;
import ImageSizeControl from "./js/controls/ImageSizeControl.js";
window.ImageSizeControl = ImageSizeControl;
import LineHeightControl from "./js/controls/LineHeightControl.js";
window.LineHeightControl = LineHeightControl;
import LinkColorControl from "./js/controls/LinkColorControl.js";
window.LinkColorControl = LinkColorControl;
import MobileDesktopToggleControl from "./js/controls/MobileDesktopToggleControl.js";
window.MobileDesktopToggleControl = MobileDesktopToggleControl;
import PlaceholderControl from "./js/controls/PlaceholderControl.js";
window.PlaceholderControl = PlaceholderControl;
import PricingTableControl from "./js/controls/PricingTableControl.js";
window.PricingTableControl = PricingTableControl;
import SectionTitleControl from "./js/controls/SectionTitleControl.js";
window.SectionTitleControl = SectionTitleControl;
import TableBlockControl from "./js/controls/TableBlockControl.js";
window.TableBlockControl = TableBlockControl;
import TextAssociateControl from "./js/controls/TextAssociateControl.js";
window.TextAssociateControl = TextAssociateControl;
import TextControl from "./js/controls/TextControl.js";
window.TextControl = TextControl;
import TextSizeControl from "./js/controls/TextSizeControl.js";
window.TextSizeControl = TextSizeControl;
import TextStyleControl from "./js/controls/TextStyleControl.js";
window.TextStyleControl = TextStyleControl;
import ValidationControl from "./js/controls/ValidationControl.js";
window.ValidationControl = ValidationControl;
import VideoOptionControl from "./js/controls/VideoOptionControl.js";
window.VideoOptionControl = VideoOptionControl;
import YoutubeControl from "./js/controls/YoutubeControl.js";
window.YoutubeControl = YoutubeControl;
import AudioControl from "./js/controls/AudioControl.js";
window.AudioControl = AudioControl;

// something in builder ext
import {
   rgb2hex,
   rgba2hex,
   removeModalGetLinkVideo,
   modal_display,
   htmlLoader
} from './js/builder_ext.js';
window.rgb2hex = rgb2hex;
window.rgba2hex = rgba2hex;
window.removeModalGetLinkVideo = removeModalGetLinkVideo;
window.modal_display = modal_display;
window.htmlLoader = htmlLoader;

// all thing from builder
import {
  createElementFromHTML,
  makeid,
  Editor,
  simulateClick
} from './js/builder.js';
window.createElementFromHTML = createElementFromHTML;
window.makeid = makeid;
window.Editor = Editor;
window.simulateClick = simulateClick;

// ClipboardJS
import ClipboardJS from './lib/clipboard.min.js';
window.ClipboardJS = ClipboardJS;

// ace JS
import * as ace from 'ace-builds/src-noconflict/ace';
// import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-html';
// import 'ace-builds/src-noconflict/worker-html';
window.ace = ace;

// Builder HTML
import main from './main.html';
import main_themewp from './main_themewp.html';
import other from './other.html';
import controls from './controls.html';
import widgets from './widgets.html';
import { BuilderIcons } from './js/icon.js';
window.BuilderIcons = BuilderIcons;

// extend prepair html for editor
Editor.prototype.setIcons = function(html) {
    var icons = BuilderIcons[iconStyle];

    for (var key in icons) {
      var value = icons[key];

      var replace = '\{' + key + '\}';
      var re = new RegExp(replace,"g");
      var re2 = new RegExp('\=' + replace,"g");

      html = html.replace(re2, '="'+value+'"');
      html = html.replace(re, value);
    }
    
    return html;
};

// extend prepair html for editor
Editor.prototype.updateLanguage = function(html) {
    for (var key in this.I18n) {
      var value = this.I18n[key];

      var replace = '\{language\.' + key + '\}';
      var re = new RegExp(replace,"g");

      html = html.replace(re, value);
    }
     return html;
};

// prepair Urls
Editor.prototype.prepairUrls = function(html) {
  html = html.replace(/{{root}}/g, this.root);
  return html;
};

Editor.prototype.prepairHtml = function(theme) {
    // custom render canvas/sidebar
    if (typeof(this.canvas) !== 'undefined' && typeof(this.sidePanel) !== 'undefined') {
      var div = $(main);

      // google font/icon
      if (!$('html').html().includes('family=Open+Sans')) {
        $('head').append('<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">');
      }
      if (!$('html').html().includes('family=Material+Icons')) {
        $('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
        $('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">');
      }

      $(this.canvas).html(this.transformHtml(div.find('.content-left')[0].outerHTML));
      $(this.canvas).append(this.transformHtml(div.find('.undo-redo')[0].outerHTML));
      $(this.sidePanel).html(this.transformHtml(div.find('#builder_sidebar')[0].outerHTML));

      $('body').append(this.transformHtml(controls));
      $('body').append(this.transformHtml(widgets));
      $('body').append(this.transformHtml(other));

      return;
    }

    // Default theme
    if (theme == 'themewp') {
      var html = main_themewp + controls + widgets + other;
    } else {
      var html = main + controls + widgets + other;
    }

    html = this.transformHtml(html);
    html = html.replace(/{{root}}/g, this.root);

    $('body').html(html);
};

Editor.prototype.build = function() {
    // set inline editor
    this.inlineEditor = inlineEditor;
    
    // Icon style
    this.iconStyle = iconStyle;
};

// Popup
require('./scss/popup.scss');
import { PopUp } from './js/popup.js';
window.PopUp = PopUp;

import { helpPopUp } from './js/helpPopup.js';
window.helpPopUp = helpPopUp;

// Sweetalert2
require('./lib/sweetalert/sweetalert2.min.css');
import Swal from './lib/sweetalert/sweetalert2.min.js';
window.Swal = Swal;

// Autocomplete
import {
    acpAutocomplete,
    acpAddCss,
    acpDictionary
} from './js/autocomplete.js';
import { type } from 'jquery';
window.acpAutocomplete = acpAutocomplete;
window.acpAddCss = acpAddCss;
window.acpDictionary = acpDictionary;
