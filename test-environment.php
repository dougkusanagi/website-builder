<?php

/**
 * Simple test script to check hosting environment compatibility
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$info = [
    'timestamp' => date('Y-m-d H:i:s'),
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'php_version' => PHP_VERSION,
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
    'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'unknown',
    'script_filename' => $_SERVER['SCRIPT_FILENAME'] ?? 'unknown',
    'current_directory' => dirname(__FILE__),
    'templates_directory_exists' => is_dir(dirname(__FILE__) . '/templates'),
    'templates_directory_writable' => is_writable(dirname(__FILE__) . '/templates'),
    'php_settings' => [
        'post_max_size' => ini_get('post_max_size'),
        'upload_max_filesize' => ini_get('upload_max_filesize'),
        'max_execution_time' => ini_get('max_execution_time'),
        'memory_limit' => ini_get('memory_limit'),
        'file_uploads' => ini_get('file_uploads') ? 'enabled' : 'disabled',
        'allow_url_fopen' => ini_get('allow_url_fopen') ? 'enabled' : 'disabled'
    ],
    'loaded_extensions' => [
        'curl' => extension_loaded('curl'),
        'json' => extension_loaded('json'),
        'mbstring' => extension_loaded('mbstring'),
        'fileinfo' => extension_loaded('fileinfo')
    ]
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $info['post_data'] = [
        'received_keys' => array_keys($_POST),
        'content_type' => $_SERVER['CONTENT_TYPE'] ?? 'not set',
        'content_length' => $_SERVER['CONTENT_LENGTH'] ?? 'not set',
        'raw_post_data_available' => !empty(file_get_contents('php://input'))
    ];

    // Test if we can receive basic POST data
    if (isset($_POST['test'])) {
        $info['test_result'] = 'POST data received successfully';
    }
} else {
    $info['note'] = 'Send a POST request with "test" parameter to test POST functionality';
}

echo json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
