<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarNotificacoes {
    
    public function listarNotificacoes($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $notIn = $this->atualizando($msg);
        
        $notificacoes = Conteiner::get('ConsultaListarNotificacoes')->consultar($usuarioId, $notIn);
        if($notificacoes){
            foreach($notificacoes as $v){
                $notificacaoId[] = $v['id'];
            }
            if($notIn){
                $notificacaoId = array_merge($notificacaoId, $msg->getCampoSessao('notificacoesNotIn'));
            }
            $msg->setCampoSessao('notificacoesNotIn', $notificacaoId);
            $msg->setResultadoEtapa(true, false, ['dados'=>$notificacoes]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $msg->getCampoSessao('notificacoesNotIn'));
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
}
