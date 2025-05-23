<?php

/**
 * Debug version of save-to-disk.php to help identify hosting issues
 */

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set proper headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Log request information
$debug_info = [
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'not set',
    'content_length' => $_SERVER['CONTENT_LENGTH'] ?? 'not set',
    'post_data_keys' => array_keys($_POST),
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
    'php_version' => PHP_VERSION,
    'timestamp' => date('Y-m-d H:i:s'),
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    'remote_addr' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

// Check PHP settings
$php_settings = [
    'post_max_size' => ini_get('post_max_size'),
    'upload_max_filesize' => ini_get('upload_max_filesize'),
    'max_execution_time' => ini_get('max_execution_time'),
    'memory_limit' => ini_get('memory_limit'),
    'file_uploads' => ini_get('file_uploads') ? 'enabled' : 'disabled'
];

try {
    // Only allow POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }

    // Check if POST data was received
    if (empty($_POST)) {
        throw new Exception('No POST data received');
    }

    // Check required fields
    $required_fields = ['template_id', 'type', 'content'];
    $missing_fields = [];

    foreach ($required_fields as $field) {
        if (!isset($_POST[$field])) {
            $missing_fields[] = $field;
        }
    }

    if (!empty($missing_fields)) {
        throw new Exception('Missing required fields: ' . implode(', ', $missing_fields));
    }

    $templateID = $_POST['template_id'];
    $type = $_POST['type'];
    $html = $_POST['content'];

    // Validate inputs
    $templateID = preg_replace('/[^a-zA-Z0-9_-]/', '', $templateID);
    $type = preg_replace('/[^a-zA-Z0-9_-]/', '', $type);

    $allowedTypes = ['default', 'custom', 'featured'];
    if (!in_array($type, $allowedTypes)) {
        throw new Exception('Invalid template type: ' . $type);
    }

    // Build path
    $basePath = dirname(__FILE__);
    $templateDir = $basePath . "/templates/" . $type . "/" . $templateID;
    $path = $templateDir . "/index.html";

    // Check paths
    $path_info = [
        'base_path' => $basePath,
        'template_dir' => $templateDir,
        'target_path' => $path,
        'template_dir_exists' => is_dir($templateDir),
        'target_file_exists' => file_exists($path),
        'target_file_writable' => file_exists($path) ? is_writable($path) : 'file does not exist',
        'template_dir_writable' => is_writable($templateDir)
    ];

    // Security check
    $realPath = realpath($templateDir);
    $allowedBasePath = realpath($basePath . "/templates");

    if (!$realPath || strpos($realPath, $allowedBasePath) !== 0) {
        throw new Exception('Access denied: Invalid path');
    }

    if (!file_exists($path)) {
        throw new Exception('Template file not found: ' . $path);
    }

    if (!is_writable($path)) {
        throw new Exception('Template file is not writable: ' . $path);
    }

    if (empty($html)) {
        throw new Exception('Empty content not allowed');
    }

    // Try to write the file
    $html = stripslashes($html);
    $result = file_put_contents($path, $html, LOCK_EX);

    if ($result === false) {
        throw new Exception('Failed to write file');
    }

    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'File saved successfully',
        'debug_info' => $debug_info,
        'php_settings' => $php_settings,
        'path_info' => $path_info,
        'bytes_written' => $result,
        'content_length' => strlen($html)
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'debug_info' => $debug_info,
        'php_settings' => $php_settings,
        'path_info' => isset($path_info) ? $path_info : 'not available'
    ]);
}
