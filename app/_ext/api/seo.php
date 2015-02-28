<?php

ini_set('default_socket_timeout', 1000);

$url = "http://freelookinfo.herokuapp.com/http://freelook.info".$_SERVER['REQUEST_URI'];

$ctx = stream_context_create(array(
    'http' => array(
        'timeout' => 1000
        )
    )
);

echo file_get_contents($url, 0, $ctx);

?>
