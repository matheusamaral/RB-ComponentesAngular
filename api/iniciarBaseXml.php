<?php
ini_set('display_errors',1);
error_reporting(-1);

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
        
use Rubeus\IntegracaoTotvs\IniciarBase\PuxarDados;
require 'iniciar.php';

$tempo = microtime(true);
$inicio = date('Y-m-d H:i:s');

$puxar = new PuxarDados();
$puxar->executar();

echo "<h2>INICIO:</h2>";
var_dump($inicio);

echo "<h2>FIM:</h2>";
var_dump(date('Y-m-d H:i:s'));

echo "<h2>TEMPO:</h2>";
var_dump(microtime(true) - $tempo);

echo "<h2>PICO MEMORIA:</h2>";
var_dump(memory_get_peak_usage(true)); 