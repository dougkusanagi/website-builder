<?php
// Minimal save script to bypass hosting restrictions
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo '{"error":"Method not allowed"}';
    exit();
}

$templateID = $_POST['template_id'] ?? '';
$type = $_POST['type'] ?? '';
$content = $_POST['content'] ?? '';

if (!$templateID || !$type || !$content) {
    http_response_code(400);
    echo '{"error":"Missing parameters"}';
    exit();
}

// Simple validation
$templateID = preg_replace('/[^a-zA-Z0-9_-]/', '', $templateID);
$type = preg_replace('/[^a-zA-Z0-9_-]/', '', $type);

if (!in_array($type, ['default', 'custom', 'featured'])) {
    http_response_code(400);
    echo '{"error":"Invalid type"}';
    exit();
}

$path = __DIR__ . "/templates/$type/$templateID/index.html";

if (!file_exists($path)) {
    http_response_code(404);
    echo '{"error":"File not found"}';
    exit();
}

if (!is_writable($path)) {
    http_response_code(403);
    echo '{"error":"File not writable"}';
    exit();
}

if (file_put_contents($path, stripslashes($content)) === false) {
    http_response_code(500);
    echo '{"error":"Write failed"}';
    exit();
}

echo '{"success":true,"message":"Saved"}';
