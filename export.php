<?php

// PHP settings
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include helper functions
include_once('helpers.php');

// Get the Template ID posted to the server
// Template ID and type are configured in your BuilderJS initialization code
// Get the HTML content submitted from BuilderJS (when user clicks SAVE)
$templateID = $_REQUEST['template_id'];
$type = $_REQUEST['type'];
$html = $_REQUEST['content'];

// Get the directory path of the specified template on the hosting server
// Path may look like this: /storage/templates/{type}/{ID}/
// In our sample templates, the HTML content is stored in the "index.html" file
$dir = dirname(__FILE__) . "/templates/" . $type . "/" . $templateID;
$path = $dir . "/index.html";

// Check if the file exists. Throw an error otherwise!
if (!file_exists($path)) {
    header("HTTP/1.1 404");
    echo json_encode([ 'message' => "File not found: $path" ]);
    return;
}

/*
 * STEP 1: SAVE BEFORE EXPORT
 * Save the posted HTML content to the corresponding template's index.html file
 *
 * You can also convert CSS to inline content and mix it with HTML, this is optional
 * Then Just uncomment the "MAKE INLINE CSS" section below
 * Remember to do the "composer require" first to install the required PHP package
 *
 * Check out the "save.php" script for further details of how you can
 * save BuilderJS content (into filesystem, MySQL, etc.)
 *
 */

/*
// @START "MAKE INLINE CSS"

// The following code is for making inline CSS content (optional)
// Require the CSS inline utility
// Install via composer:
//
//     composer require tijsverkoyen/css-to-inline-styles
//

// Require the autoload.php file
require 'vendor/autoload.php';

use TijsVerkoyen\CssToInlineStyles\CssToInlineStyles;

$styles = [
    $dir.'/css/bootstrap.min.css'
];

$cssToInlineStyles = new CssToInlineStyles();

// Convert CSS styles to inline HTML
foreach ($styles as $css) {
    $html = $cssToInlineStyles->convert($html, file_get_contents($css));
}

// @END "MAKE INLINE CSS"
*/

// Actually write the updated HTML content to the index.html file
file_put_contents($path, $html);

// create tmp folder
if (!file_exists(__DIR__ . DIRECTORY_SEPARATOR . "tmp")) {
    mkdir(__DIR__ . DIRECTORY_SEPARATOR . "tmp", 0777, true);
}

// Initialize archive object
$zipFile = "tmp/{$templateID}.zip";
$zip = new ZipArchive();
$zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE);

// Create recursive directory iterator
/** @var SplFileInfo[] $files */
$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($dir),
    RecursiveIteratorIterator::LEAVES_ONLY
);

foreach ($files as $name => $file) {
    // Skip directories (they would be added automatically)
    if (!$file->isDir()) {
        // Get real and relative path for current file
        $filePath = $file->getRealPath();
        $relativePath = substr($filePath, strlen($dir) + 1);

        // Add current file to archive
        $zip->addFile($filePath, $relativePath);
    }
}

// Zip archive will be created only after closing object
$zip->close();

// Render file content for downloading via HTTP
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.basename($zipFile));
header('Content-Transfer-Encoding: binary');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($zipFile));
readfile($zipFile);
