<?php
ini_set('display_errors',1);
error_reporting(-1);

error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
        
use Rubeus\FilaProcesso\Aplicacao\Percorrer;
use Rubeus\Bd\Persistencia;
require 'iniciar.php';


/*
 colocar alerta aqui pelo tempo de alteração do arquivo esperar
$data = date ("d/m/Y H:i:s", filemtime($arquivo)); 
 
 */

set_time_limit(9999999999);
ini_set('memory_limit', '-1');
Persistencia::setBase(1);
while(true){
    
    Percorrer::setProjeto(3);
    Percorrer::run();
    
    var_dump(Persistencia::getSentencas());
    sleep(10);
}