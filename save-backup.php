<?php
// Backup save script with original functionality but minimal headers

$templateID = $_POST['template_id'] ?? '';
$type = $_POST['type'] ?? '';
$html = $_POST['content'] ?? '';

// Basic validation
if (!$templateID || !$type || !$html) {
    echo json_encode(['error' => 'Missing parameters']);
    exit();
}

// Sanitize
$templateID = preg_replace('/[^a-zA-Z0-9_-]/', '', $templateID);
$type = preg_replace('/[^a-zA-Z0-9_-]/', '', $type);

// Validate type
if (!in_array($type, ['default', 'custom', 'featured'])) {
    echo json_encode(['error' => 'Invalid type']);
    exit();
}

// Build path
$path = dirname(__FILE__) . "/templates/" . $type . "/" . $templateID . "/index.html";

// Check file exists and is writable
if (!file_exists($path)) {
    echo json_encode(['error' => 'File not found']);
    exit();
}

if (!is_writable($path)) {
    echo json_encode(['error' => 'File not writable']);
    exit();
}

// Clean content
$html = stripslashes($html);

// Write file
$result = file_put_contents($path, $html, LOCK_EX);

if ($result === false) {
    echo json_encode(['error' => 'Write failed']);
} else {
    echo json_encode(['success' => true, 'message' => 'Saved successfully']);
}
