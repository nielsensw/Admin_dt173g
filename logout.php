<?php 
// Loggar ut och skickar till index-sidan
session_start();
session_unset();
session_destroy();

header('Location: index');
exit();