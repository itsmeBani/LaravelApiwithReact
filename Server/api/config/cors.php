<?php
return [
    'paths' => ['*'],  // Allow all paths

    'allowed_methods' => ['*'],  // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['*'],  // Allow all origins

    'allowed_origins_patterns' => [],  // You can leave it empty or keep it for pattern-based origin restrictions

    'allowed_headers' => ['*'],  // Allow all headers

    'exposed_headers' => [],  // No headers to expose (you can add any headers you need here)

    'max_age' => 0,  // No cache for pre-flight requests

    'supports_credentials' => true,  // Allow credentials (cookies, authentication)
];
