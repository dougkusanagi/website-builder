<?php

ini_set('display_errors', 1);

require 'vendor/autoload.php';

use Aws\S3\S3Client;

// AWS credentials
$key = 'AWS-ACCESS-KEY-ID';
$bucket = 'YOUR-BUCKET';
$secret = 'AWS-SECRET-ACCESS-KEY';
$region = 'us-west-2';

// Get submitted template ID and its content
$id = $_POST['template_id'];
$html = $_POST['content'];
$htmlfile = "/tmp/template-{$id}";

// Put the latest HTML content to a temp file before pushing to AWS S3
file_put_contents($htmlfile, $html);

// Instantiate an Amazon S3 client.
$s3 = new S3Client([
    'version'     => 'latest',
    'region'      => $region,
    'credentials' => [
        'key'    => $key,
        'secret' => $secret,
    ],
]);


try {
    $s3->putObject([
        'Bucket' => $bucket,
        'Key'    => 'my-object',
        'Body'   => fopen($htmlfile, 'r'),
        'ACL'    => 'public-read',
    ]);

    // Success
    header("HTTP/1.1 200");
    header('Content-Type: application/json');
    echo json_encode([ 'success' => "Written to file {$path}" ]);
    return;
} catch (Aws\S3\Exception\S3Exception $e) {
    // Failed
    header("HTTP/1.1 404");
    echo json_encode([ 'message' => "There was an error uploading to AWS S3:\n".$e->getMessage() ]);
    return;
}
