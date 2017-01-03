<?php
namespace Quickpeek\Local\Aplicacao\Pesquisar;
use Rubeus\ContenerDependencia\Conteiner;

class PesquisarPessoas {
    
    public function pesquisarPessoas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $pesquisa = $msg->getCampo('Pesquisa')->get('valor');
        
        $notIn = $this->atualizando($msg);
        
        $query = Conteiner::get('ConsultaPesquisarPessoas')->consultar($usuarioId, $pesquisa, $notIn);
        
        if($query){
        foreach($query as $v){
            $pessoasId[] = $v['usuarioId'];    
        }
        if($notIn){
            $pessoasId = array_merge($msg->getCampoSessao('pessoasNotIn'), $pessoasId);
        }
        $msg->setCampoSessao('pessoasNotIn', $pessoasId);
        $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $msg->getCampoSessao('pessoasNotIn'));
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
}