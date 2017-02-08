<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

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
            $this->visualizarNotificacoes($msg);
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
    
    private function visualizarNotificacoes($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $notificacoesId = Conteiner::get('ConsultaVisualizarNotificacoes')->consultar($usuarioId);
        
        if($notificacoesId){
            foreach($notificacoesId as $v){
                $visualizado[] = 1;
            }
            $entidade = ConteinerEntidade::getInstancia('Notificacoes');
            $entidade->set('id', $notificacoesId);
            $entidade->set('visualizado', $visualizado);
            $entidade->salvar();
            
            if(!$entidade->getErro()){
                return true;
            }else{
                return false;
            }
        }
    }
}
