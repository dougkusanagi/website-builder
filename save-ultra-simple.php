<?php
// Ultra-minimal save script for restrictive shared hosting
if ($_POST['template_id'] && $_POST['type'] && $_POST['content']) {
    $id = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['template_id']);
    $type = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['type']);

    if (in_array($type, array('default', 'custom', 'featured'))) {
        $file = dirname(__FILE__) . "/templates/" . $type . "/" . $id . "/index.html";

        if (file_exists($file) && is_writable($file)) {
            if (file_put_contents($file, stripslashes($_POST['content']))) {
                echo '{"success":true}';
            } else {
                echo '{"error":"write_failed"}';
            }
        } else {
            echo '{"error":"file_not_writable"}';
        }
    } else {
        echo '{"error":"invalid_type"}';
    }
} else {
    echo '{"error":"missing_data"}';
}
