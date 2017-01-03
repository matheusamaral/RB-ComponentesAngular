<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarPessoas {
    
    public function listarPessoas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Local::id')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        
        $notIn = $this->atualizando($msg);
        
        $pessoa = Conteiner::get('ConsultaPessoa');
        $query = $pessoa->consultar($usuarioId, $localId, 
                $tempo['midia'], $tempo['hashtag'], 15, $notIn);
        
        if($query){
            foreach($query as $v){
                $usuariosId[] = $v['usuarioId'];
            }
            if($notIn){
                $usuariosId = array_merge($msg->getCampoSessao('usuariosNotIn'), $usuariosId);
            }
            $msg->setCampoSessao('usuariosNotIn', $usuariosId);
            $query['qtd'] = $pessoa->consultarQtd($localId);
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $msg->getCampoSessao('usuariosNotIn'));
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
}
