<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConfirmarSeguir {
    
    public function confirmarSeguir($msg){
        
        $usuarioSessaoId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioId = $msg->getCampo('Seguir::usuarioId')->get('valor');
        
        $seguirId = Conteiner::get('ConsultaSeguirId')->consultar($usuarioSessaoId, $usuarioId);
        if($seguirId){
            $msg->setCampo('entidade', 'Seguir');
            $msg->setCampo('Seguir::id', $seguirId);
            $msg->setCampo('Seguir::confirmarSeguir', 1);
            $msg->setCampo('Seguir::momentoConfirmarSeguir', date('Y-m-d H:i:s'));
            $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        }
        
        if($cad){
            $this->enviarNotificacao($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function enviarNotificacao($msg){
        
        $usuarioAcaoId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioId = $msg->getCampo('Seguir::usuarioId')->get('valor');
        $msg->setCampo('entidade', 'Notificacoes');
        $msg->setCampo('Notificacoes::usuarioId', $usuarioId);
        $msg->setCampo('Notificacoes::usuarioAcaoId', $usuarioAcaoId);
        $msg->setCampo('Notificacoes::tipoId', 2);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}