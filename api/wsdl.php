<?php
require 'iniciar.php';

header('Content-Type:text/xml');
switch ($_GET['root']){
    case 'integracaoTotvs':
        echo str_replace('[[DOMINIO]]',DOMINIO_PROJETO,
                file_get_contents(Ambiente::dir(__DIR__).'/../../vendor/rubeus/integration-totvs/WebService/RastreamentoWSM.wsdl'));
    break;
}

