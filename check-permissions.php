<?php
$templatePath = dirname(__FILE__) . "/templates/featured/000-01-colorfull/index.html";

echo "File path: " . $templatePath . "\n";
echo "File exists: " . (file_exists($templatePath) ? "YES" : "NO") . "\n";
echo "File readable: " . (is_readable($templatePath) ? "YES" : "NO") . "\n";
echo "File writable: " . (is_writable($templatePath) ? "YES" : "NO") . "\n";
echo "Directory writable: " . (is_writable(dirname($templatePath)) ? "YES" : "NO") . "\n";

if (file_exists($templatePath)) {
    echo "File permissions: " . substr(sprintf('%o', fileperms($templatePath)), -4) . "\n";
    echo "File owner: " . fileowner($templatePath) . "\n";
    echo "File group: " . filegroup($templatePath) . "\n";
}

echo "Current user: " . get_current_user() . "\n";
echo "PHP version: " . PHP_VERSION . "\n";
