<?php
ini_set('display_startup_errors',1);
ini_set('display_errors',1);
error_reporting(-1);

include 'iniciar.php';
use Rubeus\Processo\Dominio\Processo\RepositorioProcesso;
use Rubeus\ContenerDependencia\Conteiner;

$processo = RepositorioProcesso::get('Local', 'excluirLocais');
$processo->executar(Conteiner::get('Mensagem'), true);