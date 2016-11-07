<?php
ini_set('display_errors',1);
error_reporting(-1);

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
        
use Rubeus\FilaProcesso\Aplicacao\Percorrer;
require 'iniciar.php';


/*
 colocar alerta aqui pelo tempo de alteração do arquivo esperar
$data = date ("d/m/Y H:i:s", filemtime($arquivo)); 
 
 */

set_time_limit(9999999999);
ini_set('memory_limit', '-1');


$parametro = $_SERVER['argv'];

Percorrer::setProjeto(3);
switch ($parametro[1]){
    case 'enviar':
//        \Rubeus\Bd\Persistencia::setGuardar(1);
        Percorrer::run(explode('-',$parametro[2]));
//        file_put_contents(__DIR__.'/sentenca.json', json_encode(\Rubeus\Bd\Persistencia::getSentencas()));
//        file_put_contents('/var/www/html/multivixmy/api/sentenca2.json', json_encode(\Rubeus\Bd\Persistencia::getSentencas()));
        break;
    default :
//        $esperar = file_get_contents(Ambiente::dir(__DIR__).'/esperar.txt');
//        if($esperar != 1){//        
//            file_put_contents(Ambiente::dir(__DIR__).'/esperar.txt','1');
            
            Percorrer::run();
//            file_put_contents(Ambiente::dir(__DIR__).'/esperar.txt','0');
//        }
        break;
}
