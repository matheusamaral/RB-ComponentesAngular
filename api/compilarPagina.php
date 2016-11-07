<?php
use Rubeus\Servicos\Entrada\I;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\Processo\Dominio\Processo\RepositorioProcesso;
require 'iniciar.php';

$paginaBase = Conteiner::get('PAGINA_BASE');

$processo = $paginaBase->{I::get('pagina')}->processo;
$dados = array();
 

for($i=0;$i<count($processo);$i++){
    $processo = RepositorioProcesso::get($processo[$i]->processo, $processo[$i]->etapa);
    $resultado = $processo->executar(false,true);  
    if($resultado['success']){
        $dados = array_merge($dados,$resultado['dados']);
    }
}

ob_start();
include DIR_BASE.'/'.$dados['enderecoArquivo'];
$texto = ob_get_contents();
ob_end_clean();

$arrayValor = [];
$arrayTexto = [];

foreach($dados as $key => $value){
    $arrayValor[] = $value;
    $arrayTexto[] = '[['.$key.']]';
 }
 
 echo str_replace($arrayTexto,$arrayValor,$texto);