<?php
//ini_set('display_startup_errors',1);
//ini_set('display_errors',1);
//error_reporting(-1);
    
date_default_timezone_set('America/Sao_Paulo');

use Rubeus\FrontController\ConfigurarAmbiente;

abstract class Ambiente{
    public static function dir($dir){
        return str_replace('\\','/',$dir);
    }
    
    public static function amb(){
        return isset($_SERVER['AmbExec']) ? $_SERVER['AmbExec'] : 'server';
    }
}

require Ambiente::dir(__DIR__).'/../vendor/autoload.php';
ConfigurarAmbiente::configurar(str_replace('api', '', Ambiente::dir(__DIR__)),'/src/config/define'.Ambiente::amb().'.json');
