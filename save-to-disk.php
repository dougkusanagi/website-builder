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
// Path may look like this: /storage/templates/{type}/{ID}/
// In our sample templates, the HTML content is stored in the "index.html" file
$path = dirname(__FILE__) . "/templates/" . $type . "/" . $templateID . "/index.html";

// Check if the file exists. Throw an error otherwise!
// Get the HTML content submitted from BuilderJS (when user clicks SAVE)
$html = $_POST['content'];

if (!file_exists($path)) {
    header("HTTP/1.1 404");
    echo json_encode([ 'message' => "File not found: $path" ]);
    return;
}

// Actually write the updated HTML content to the index.html file
file_put_contents($path, $html);

// BuilderJS expects JSON response, so we need to set up the HTTP response' headers accordingly
// And return 200 SUCCESS
header("HTTP/1.1 200");
header('Content-Type: application/json');
echo json_encode([ 'success' => "Written to file {$path}" ]);
return;
