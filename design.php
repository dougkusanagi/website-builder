<?php
    // Helper function to constitute a valid path
    function join_paths()
    {
        $paths = array();
        foreach (func_get_args() as $arg) {
            if ($arg !== '') {
                $paths[] = $arg;
            }
        }

        return preg_replace('#/+#', '/', implode('/', $paths));
    }

    // find template url
    $templateUrl = 'templates/' . $_GET['type'] . '/' . $_GET['id'];
    $theme = 'templates/' . $_GET['type'] . '/' . $_GET['id'] . '/theme.js';

    // Detect the absolute URL to BuilderJS' dist/ folder
    $baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $baseUrl = parse_url($baseUrl, PHP_URL_PATH);         // Get something like "/builderjs/hello.php/"
    $baseUrl = trim($baseUrl, '/');                       // Get something like "builderjs/hello.php" (without slashes)
    $baseUrl = preg_replace('/[^\/]+.php$/', '', $baseUrl);   // Remove the script name (*.php) from the path to get something like "builderjs/"

    $distUrl = join_paths('/', $baseUrl, '/dist/');       // Constitute the final path to the dist/ folder, which is something like "/builderjs/dist/"
    // and this path shall be passed as the value of "root" parameter in BuliderJS construction function
    ?>
<!doctype html>
<html>
    <head>
        <title>BuilderJS 4.0</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link href="assets/image/builderjs_color_logo.png" rel="icon" type="image/x-icon" />
        <link rel="stylesheet" href="dist/builder.css">
        <script src="dist/builder.js"></script>

        <!-- @RSS Plugin -->
        <script src="plugins/rss/RssElement.js"></script>
        <script src="plugins/rss/RssControl.js"></script>
        <script src="plugins/rss/RssWidget.js"></script>

        <script>
            // Builder parameters
            var params = new URLSearchParams(window.location.search);
            var strict = (params.get('type') == 'custom' ? false : true);
            var templates = [{"name":"Blank","url":"design.php?id=6037a0a8583a7&type=default","thumbnail":"templates\/default\/6037a0a8583a7\/thumb.png"}, {"name":"Pricing Table","url":"design.php?id=6037a2135b974&type=default","thumbnail":"templates\/default\/6037a2135b974\/thumb.png"}, {"name":"Listing & Tables","url":"design.php?id=6037a2250a3a3&type=default","thumbnail":"templates\/default\/6037a2250a3a3\/thumb.png"}, {"name":"Forms Building","url":"design.php?id=6037a23568208&type=default","thumbnail":"templates\/default\/6037a23568208\/thumb.png"}, {"name":"1-2-1 column layout","url":"design.php?id=6037a2401b055&type=default","thumbnail":"templates\/default\/6037a2401b055\/thumb.png"}, {"name":"1-2 column layout","url":"design.php?id=6037a24ebdbd6&type=default","thumbnail":"templates\/default\/6037a24ebdbd6\/thumb.png"}, {"name":"1-3-1 column layout","url":"design.php?id=6037a25ddce80&type=default","thumbnail":"templates\/default\/6037a25ddce80\/thumb.png"}, {"name":"1-3-2 column layout","url":"design.php?id=6037a26b0a286&type=default","thumbnail":"templates\/default\/6037a26b0a286\/thumb.png"}, {"name":"1-3 column layout","url":"design.php?id=6037a275bf375&type=default","thumbnail":"templates\/default\/6037a275bf375\/thumb.png"}, {"name":"One column layout","url":"design.php?id=6037a28418c95&type=default","thumbnail":"templates\/default\/6037a28418c95\/thumb.png"}, {"name":"2-1-2 column layout","url":"design.php?id=6037a29a35e05&type=default","thumbnail":"templates\/default\/6037a29a35e05\/thumb.png"}, {"name":"2-1 column layout","url":"design.php?id=6037a2aa315d4&type=default","thumbnail":"templates\/default\/6037a2aa315d4\/thumb.png"}, {"name":"Two columns layout","url":"design.php?id=6037a2b67ed27&type=default","thumbnail":"templates\/default\/6037a2b67ed27\/thumb.png"}, {"name":"3-1-3 column layout","url":"design.php?id=6037a2c3d7fa1&type=default","thumbnail":"templates\/default\/6037a2c3d7fa1\/thumb.png"}, {"name":"Three columns layout","url":"design.php?id=6037a2dcb6c56&type=default","thumbnail":"templates\/default\/6037a2dcb6c56\/thumb.png"}];
            var tags = [{type: 'label', tag: 'CONTACT_FIRST_NAME'}, {type: 'label', tag: 'CONTACT_LAST_NAME'}, {type: 'label', tag: 'CONTACT_FULL_NAME'}, {type: 'label', tag: 'CONTACT_EMAIL'}, {type: 'label', tag: 'CONTACT_PHONE'}, {type: 'label', tag: 'CONTACT_ADDRESS'}, {type: 'label', tag: 'ORDER_ID'}, {type: 'label', tag: 'ORDER_DUE'}, {type: 'label', tag: 'ORDER_TAX'}, {type: 'label', tag: 'PRODUCT_NAME'}, {type: 'label', tag: 'PRODUCT_PRICE'}, {type: 'label', tag: 'PRODUCT_QTY'}, {type: 'label', tag: 'PRODUCT_SKU'}, {type: 'label', tag: 'AGENT_NAME'}, {type: 'label', tag: 'AGENT_SIGNATURE'}, {type: 'label', tag: 'AGENT_MOBILE_PHONE'}, {type: 'label', tag: 'AGENT_ADDRESS'}, {type: 'label', tag: 'AGENT_WEBSITE'}, {type: 'label', tag: 'AGENT_DISCLAIMER'}, {type: 'label', tag: 'CURRENT_DATE'}, {type: 'label', tag: 'CURRENT_MONTH'}, {type: 'label', tag: 'CURRENT_YEAR'}, {type: 'button', tag: 'PERFORM_CHECKOUT', 'text': 'Checkout'}, {type: 'button', tag: 'PERFORM_OPTIN', 'text': 'Subscribe'}];

            // new builder
            var editor = new Editor({
                // emailMode: true,
                strict: strict, // default == true
                showInlineToolbar: true, // default == true
                root: '<?php echo $distUrl ?>',
                url: '<?php echo $templateUrl ?>',
                urlBack: window.location.origin,
                uploadAssetUrl: 'asset.php',
                uploadAssetMethod: 'POST',
                uploadTemplateUrl: 'upload.php',
                uploadTemplateCallback: function(response) {
                    window.location = response.url;
                },
                saveUrl: 'save-to-disk.php', // You can try with other sample server scripts like: save-to-mysql.php or save-to-aws-s3.php
                saveMethod: 'POST',
                data: {
                    _token: 'CSRF_TOKEN',
                    type: '<?php echo $_GET['type'] ?>',
                    template_id: '<?php echo $_GET['id'] ?>'
                },
                templates: templates,
                tags: tags,
                changeTemplateCallback: function(url) {
                    window.location = url;
                },

                /*
                    Disable features: 
                    change_template|export|save_close|footer_exit|help
                */
                // disableFeatures: [ 'widgets', 'change_template', 'export', 'save_close', 'footer_exit', 'help' ], 
                // disableWidgets: [ 'TwoColumnsWidget', 'ThreeColumnsWidget' ],
                // extendedWidgets: [ 'AudioWidget' ],
                // Custom header for: save, changeTemplate, export
                // header: { "Authorize": "KEY-DFDJUELDFDKFJDK" },

                export: {
                    url: 'export.php'
                },
                backgrounds: [
                    '/assets/image/backgrounds/images1.jpg',
                    '/assets/image/backgrounds/images2.jpg',
                    '/assets/image/backgrounds/images3.jpg',
                    '/assets/image/backgrounds/images4.png',
                    '/assets/image/backgrounds/images5.jpg',
                    '/assets/image/backgrounds/images6.jpg',
                    '/assets/image/backgrounds/images9.jpg',
                    '/assets/image/backgrounds/images11.jpg',
                    '/assets/image/backgrounds/images12.jpg',
                    '/assets/image/backgrounds/images13.jpg',
                    '/assets/image/backgrounds/images14.jpg',
                    '/assets/image/backgrounds/images15.jpg',
                    '/assets/image/backgrounds/images16.jpg',
                    '/assets/image/backgrounds/images17.png'
                ]
            });
            
            // @RSS plugin
            var rssWidget = new RssWidget({ handler: 'rss.php' });
            editor.addWidget(rssWidget, { index: 10 });

            $( document ).ready(function() {
                editor.init();
            });
        </script>

        <style>
            .lds-dual-ring {
                display: inline-block;
                width: 80px;
                height: 80px;
            }
            .lds-dual-ring:after {
                content: " ";
                display: block;
                width: 30px;
                height: 30px;
                margin: 4px;
                border-radius: 80%;
                border: 2px solid #aaa;
                border-color: #007bff transparent #007bff transparent;
                animation: lds-dual-ring 1.2s linear infinite;
            }
            @keyframes lds-dual-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        </style>
    </head>
    <body class="overflow-hidden">
        <div style="text-align: center;
            height: 100vh;
            vertical-align: middle;
            padding: auto;
            display: flex;">
            <div style="margin:auto" class="lds-dual-ring"></div>
        </div>

        <script>
            switch(window.location.protocol) {
                case 'http:':
                case 'https:':
                  //remote file over http or https
                  break;
                case 'file:':
                  alert('Please put the builderjs/ folder into your document root and open it through a web URL');
                  window.location.href = "./index.php";
                  break;
                default:
                  //some other protocol
            }
        </script>
    </body>
</html>
