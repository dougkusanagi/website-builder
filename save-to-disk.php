<?php

/**
 * This is a demo of how you handle SAVE requests from BuilderJS.
 * The example is in PHP. However, you can use any server side programming
 * you are familiar with (JAVA, .NET, Ruby, Perl, Python...).
 *
 * The point is to capture the HTML content posted from BuilderJS
 * through HTTP "content" parameter to the server.
 *
 * In this example, we write back the updated HTML content to the original template file
 *
 */

// Get the Template ID posted to the server
// Template ID and type are configured in your BuilderJS initialization code
$templateID = $_POST['template_id'];
$type = $_POST['type'];

// Get the directory path of the specified template on the hosting server
$basePath = dirname(__FILE__) . "/templates/" . $type . "/" . $templateID;
$path = $basePath . "/index.html";

// Add security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// Check if the directory exists, if not create it
if (!file_exists($basePath)) {
    if (!mkdir($basePath, 0755, true)) {
        header("HTTP/1.1 500");
        echo json_encode(['message' => "Could not create directory: $basePath"]);
        return;
    }
}

// Check if the directory is writable
if (!is_writable($basePath)) {
    header("HTTP/1.1 403");
    echo json_encode(['message' => "Directory is not writable: $basePath"]);
    return;
}

// Get the HTML content submitted from BuilderJS (when user clicks SAVE)
$html = $_POST['content'];

// Actually write the updated HTML content to the index.html file
if (file_put_contents($path, $html) === false) {
    header("HTTP/1.1 500");
    echo json_encode(['message' => "Could not write to file: $path"]);
    return;
}

// BuilderJS expects JSON response, so we need to set up the HTTP response' headers accordingly
// And return 200 SUCCESS
header("HTTP/1.1 200");
header('Content-Type: application/json');
echo json_encode(['success' => "Written to file {$path}"]);
return;
