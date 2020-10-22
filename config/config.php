<?php 
// sessions-start och kopplar automatik för åtkomst till klasser
session_start();

function __autoload($class) {
    include "classes/" . $class . ".class.php";
}
