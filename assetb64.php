<?php

// Get the Template ID posted to the server
// Template ID and type are configured in your BuilderJS initialization code
$templateID = $_POST['template_id'];
$type = $_POST['type'];

if ($_POST['assetType'] == 'upload') {
    // Get b64 content
    $content = file_get_contents($_FILES['file']['tmp_name']);

    // Comvert to Base64
    $base64 = 'data:image/jpg;base64,' . base64_encode($content);
} elseif ($_POST['assetType'] == 'url') {
    // Download the file's content
    $content = file_get_contents($_POST['url']);

    // Comvert to Base64
    $base64 = 'data:image/jpg;base64,' . base64_encode($content);
} elseif ($_POST['assetType'] == 'base64') {
    $base64 = $_POST['url_base64'];
}

// Return the relative URL of the asset
// Set up HTTP header for response
header('Content-Type: application/json');
header("HTTP/1.1 200");
echo json_encode([ 'url' => $base64 ]);
