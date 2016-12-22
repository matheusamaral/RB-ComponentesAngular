<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarNotificacoes {
    
    public function listarNotificacoes($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        $notificacaoNotIn = $msg->getCampoSessao('notIn');
        
        if($atualizando){
            $notIn = implode(', ', $notificacaoNotIn);
        }else{
            $notIn = 0;
        }
        
        $notificacoes = Conteiner::get('ConsultaListarNotificacoes')->consultar($usuarioId, $notIn);
        if($notificacoes){
            foreach($notificacoes as $v){
                $notificacaoId[] = $v['id'];
            }
            if($atualizando){
                $notificacaoId = array_merge($notificacaoId, $notificacaoNotIn);
            }
            $msg->setCampoSessao('notIn', $notificacaoId);
            $msg->setResultadoEtapa(true, false, ['dados'=>$notificacoes]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
