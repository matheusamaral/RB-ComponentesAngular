<?php
//ini_set('display_startup_errors',1);
//ini_set('display_errors',-1);
//error_reporting(-1);

//set_time_limit(9999999999);
//ini_set('memory_limit', '-1');
date_default_timezone_set('America/Sao_Paulo');

use Rubeus\FrontController\ConfigurarAmbiente;

abstract class Ambiente{
    public static function dir($dir){
        return str_replace('\\','/',$dir);
    }
       
    public static function amb(){
        if(isset($_SERVER['AmbExec']) && $_SERVER['AmbExec'] == 'server' ){
            return $_SERVER['SERVER_NAME'].'/define.json';
        }
        $parametro = $_SERVER['argv'];
        return isset($_SERVER['AmbExec']) ? $_SERVER['AmbExec'].'/define.json': $parametro[1].'/define.json';
    }
}

require Ambiente::dir(__DIR__).'/../../vendor/autoload.php';

//var_dump(str_replace('api', '', Ambiente::dir(__DIR__)),'/src/config/'.Ambiente::amb().'');
//exit();

ConfigurarAmbiente::configurar(str_replace('api', '', Ambiente::dir(__DIR__)),'/src/config/'.Ambiente::amb());
