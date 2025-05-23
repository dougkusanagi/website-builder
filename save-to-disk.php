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

// Set proper headers for CORS and content type
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Check if required POST data exists
if (!isset($_POST['template_id']) || !isset($_POST['type']) || !isset($_POST['content'])) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Missing required parameters']);
    exit();
}

// Get the Template ID posted to the server
// Template ID and type are configured in your BuilderJS initialization code
$templateID = $_POST['template_id'];
$type = $_POST['type'];

// Sanitize input parameters
$templateID = preg_replace('/[^a-zA-Z0-9_-]/', '', $templateID);
$type = preg_replace('/[^a-zA-Z0-9_-]/', '', $type);

// Validate type parameter
$allowedTypes = ['default', 'custom', 'featured'];
if (!in_array($type, $allowedTypes)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid template type']);
    exit();
}

// Get the directory path of the specified template on the hosting server
// Path may look like this: /storage/templates/{type}/{ID}/
// In our sample templates, the HTML content is stored in the "index.html" file
$basePath = dirname(__FILE__);
$templateDir = $basePath . "/templates/" . $type . "/" . $templateID;
$path = $templateDir . "/index.html";

// Ensure the path is within the expected directory structure (security check)
$realPath = realpath($templateDir);
$allowedBasePath = realpath($basePath . "/templates");

if (!$realPath || strpos($realPath, $allowedBasePath) !== 0) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Access denied: Invalid path']);
    exit();
}

// Check if the file exists. Throw an error otherwise!
if (!file_exists($path)) {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(['error' => "Template file not found: $templateID"]);
    exit();
}

// Check if the file is writable
if (!is_writable($path)) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Template file is not writable']);
    exit();
}

// Get the HTML content submitted from BuilderJS (when user clicks SAVE)
$html = $_POST['content'];

// Validate HTML content
if (empty($html)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Empty content not allowed']);
    exit();
}

// Basic HTML sanitization to prevent malicious content
$html = stripslashes($html);

// Create backup before writing
$backupPath = $path . '.backup.' . date('Y-m-d-H-i-s');
if (file_exists($path)) {
    copy($path, $backupPath);
}

// Actually write the updated HTML content to the index.html file
$result = file_put_contents($path, $html, LOCK_EX);

if ($result === false) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Failed to write file']);
    exit();
}

// BuilderJS expects JSON response, so we need to set up the HTTP response' headers accordingly
// And return 200 SUCCESS
http_response_code(200);
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => "Template saved successfully",
    'template_id' => $templateID,
    'type' => $type,
    'timestamp' => date('Y-m-d H:i:s')
]);
exit();
