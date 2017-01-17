<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarNotificacoes {
    
    public function listarNotificacoes($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $notIn = $this->atualizando($msg);
        
        $consulta = Conteiner::get('ConsultaListarNotificacoes');
        
        $notificacoes = $consulta->consultar($usuarioId, $notIn);
        if($notificacoes){
            foreach($notificacoes as $v){
                $notificacaoId[] = $v['id'];
            }
            if($notIn){
                $notificacaoId = array_merge($notificacaoId, $msg->getCampoSessao('notificacoesNotIn'));
            }
            $msg->setCampoSessao('notificacoesNotIn', $notificacaoId);
            
            $contagemSeguir = $consulta->consultarContagemSolicitacoes($usuarioId);
            if($contagemSeguir){
                $usuarioSeguir = $consulta->consultarSolicitacoesSeguir($usuarioId);
                $seguir['contagem'] = $contagemSeguir;
                $seguir['usuario'] = $usuarioSeguir;
                $dados['seguir'] = $seguir;
            }
            $dados['notificacoes'] = $notificacoes;
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
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
