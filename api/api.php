<?php
use Rubeus\FrontController\FrontController;
require 'iniciar.php';
var_dump($_FILES);

$front = new FrontController();
$front->iniciar();
