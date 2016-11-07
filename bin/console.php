<?php

$parametro = $_SERVER['argv'];

switch ($parametro[1]){
    case 'gerarBase':
        include __DIR__.'/../vendor/rubeus/generate-project/Base/GerarBase.php';
        break;
}
