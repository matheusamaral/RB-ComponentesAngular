<?php
namespace Quickpeek\Local\Aplicacao\Pesquisar;
use Rubeus\ContenerDependencia\Conteiner;

class PesquisarPessoas {
    
    public function pesquisarPessoas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $pesquisa = $msg->getCampo('Pesquisa')->get('valor');
        
        $query = Conteiner::get('ConsultaPesquisarPessoas')->consultar($usuarioId, $pesquisa);
        var_dump($query);
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}