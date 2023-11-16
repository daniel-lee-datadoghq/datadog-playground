<?php
// DDTrace library is loaded via the Dockerfile
$context = \DDTrace\current_context();

// Your test message
$message = 'Hello, World!';

// Your API key
$apiKey = '<DD-API-KEY>';

// data to send to API
$postData = array(
    'message' => $message,
    'dd.trace_id' => $context['trace_id'],
    'dd.span_id' => $context['span_id'],
    'service' => 'php-test-app',
    'ddtags' => 'env:staging,version:5.1',
    'host' => '<HOST_IDENTIFIER>',
    'ddsource' => 'php'
);

// Setup cURL for POST
$ch = curl_init('https://http-intake.logs.datadoghq.com/api/v2/logs');
curl_setopt_array($ch, array(
    CURLOPT_POST => TRUE,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => array(
        'DD-API-KEY: '.$apiKey,
        'Content-Type: application/json',
        'Accept: application/json'
    ),
    CURLOPT_POSTFIELDS => json_encode($postData)
));

// Send the request
$response = curl_exec($ch);

// Check for errors
if($response === FALSE){
    die(curl_error($ch));
}

// Decode the response
$responseData = json_decode($response, TRUE);

// Close the cURL handler
curl_close($ch);

// Print test message
echo $message

// comment out the following to send logs to docker stdout & stderr
# $append = sprintf(
#     ' [dd.trace_id=%s dd.span_id=%s]',
#     $context['trace_id'],
#     $context['span_id']
#  );
# $sample_log = sprintf('Hello world %s', $append);
# file_put_contents('php://stdout', $sample_log);
?>