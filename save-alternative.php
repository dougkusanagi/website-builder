<?php

/**
 * Alternative save endpoint that handles potential hosting restrictions
 */

// Start output buffering to prevent any accidental output
ob_start();

// Set error handling
error_reporting(E_ALL);
ini_set('display_errors', 0); // Disable for production
ini_set('log_errors', 1);

// Set proper headers immediately
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: 0');

// Enhanced CORS headers
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $allowed_origins = [
        'https://guepardosys.com.br',
        'http://guepardosys.com.br',
        'https://www.guepardosys.com.br',
        'http://www.guepardosys.com.br'
    ];

    if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
        header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
    }
} else {
    header('Access-Control-Allow-Origin: *');
}

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_clean();
    exit();
}

// Function to send JSON response and exit
function sendResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    ob_end_clean();
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// Function to log errors
function logError($message)
{
    error_log('[BuilderJS Save] ' . $message);
}

try {
    // Only allow POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendResponse(['error' => 'Method not allowed'], 405);
    }

    // Check for required POST data
    $required_fields = ['template_id', 'type', 'content'];
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            logError("Missing required field: $field");
            sendResponse(['error' => "Missing required field: $field"], 400);
        }
    }

    // Get and sanitize inputs
    $templateID = trim($_POST['template_id']);
    $type = trim($_POST['type']);
    $content = $_POST['content'];

    // Validate template ID (alphanumeric, hyphens, underscores only)
    if (!preg_match('/^[a-zA-Z0-9_-]+$/', $templateID)) {
        logError("Invalid template ID: $templateID");
        sendResponse(['error' => 'Invalid template ID format'], 400);
    }

    // Validate template type
    $allowedTypes = ['default', 'custom', 'featured'];
    if (!in_array($type, $allowedTypes)) {
        logError("Invalid template type: $type");
        sendResponse(['error' => 'Invalid template type'], 400);
    }

    // Build and validate file path
    $basePath = dirname(__FILE__);
    $templateDir = $basePath . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . $type . DIRECTORY_SEPARATOR . $templateID;
    $filePath = $templateDir . DIRECTORY_SEPARATOR . 'index.html';

    // Security: Ensure the path is within allowed directory
    $realBasePath = realpath($basePath . DIRECTORY_SEPARATOR . 'templates');
    $realTemplatePath = realpath($templateDir);

    if (!$realBasePath || !$realTemplatePath || strpos($realTemplatePath, $realBasePath) !== 0) {
        logError("Security violation: Attempted access to $templateDir");
        sendResponse(['error' => 'Access denied'], 403);
    }

    // Check if template directory exists
    if (!is_dir($templateDir)) {
        logError("Template directory not found: $templateDir");
        sendResponse(['error' => 'Template not found'], 404);
    }

    // Check if target file exists
    if (!file_exists($filePath)) {
        logError("Template file not found: $filePath");
        sendResponse(['error' => 'Template file not found'], 404);
    }

    // Check if file is writable
    if (!is_writable($filePath)) {
        logError("Template file not writable: $filePath");
        sendResponse(['error' => 'Template file is not writable'], 403);
    }

    // Validate content
    if (strlen($content) === 0) {
        sendResponse(['error' => 'Content cannot be empty'], 400);
    }

    // Check content size (prevent extremely large uploads)
    $maxSize = 10 * 1024 * 1024; // 10MB
    if (strlen($content) > $maxSize) {
        logError("Content too large: " . strlen($content) . " bytes");
        sendResponse(['error' => 'Content too large'], 413);
    }

    // Create backup before saving
    $backupPath = $filePath . '.backup.' . date('YmdHis');
    if (file_exists($filePath)) {
        if (!copy($filePath, $backupPath)) {
            logError("Failed to create backup: $backupPath");
        }
    }

    // Process content
    $content = stripslashes($content);

    // Write to file with exclusive lock
    $bytesWritten = file_put_contents($filePath, $content, LOCK_EX);

    if ($bytesWritten === false) {
        logError("Failed to write file: $filePath");
        sendResponse(['error' => 'Failed to save template'], 500);
    }

    // Success response
    sendResponse([
        'success' => true,
        'message' => 'Template saved successfully',
        'template_id' => $templateID,
        'type' => $type,
        'bytes_written' => $bytesWritten,
        'timestamp' => date('c')
    ]);
} catch (Exception $e) {
    logError("Exception: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
} catch (Error $e) {
    logError("Error: " . $e->getMessage());
    sendResponse(['error' => 'Internal server error'], 500);
}
