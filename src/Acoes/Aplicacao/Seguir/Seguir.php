<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class Seguir {
    
    public function seguir($msg){
        
        $usuarioSeguirId = $msg->getCampo('Seguir::usuarioSeguirId')->get('valor');
        
        $contaPrivada = Conteiner::get('ConsultaContaPrivada')->consultar($usuarioSeguirId);
        
        if($contaPrivada == 0){
            $msg->setCampo('Seguir::confirmarSeguir', 1);
            $msg->setCampo('Seguir::momentoConfirmarSeguir', date('Y-m-d H:i:s'));
            
            if($this->cadastrar($msg)){
                $this->enviarNotificacaoSeguindo($msg);
            }
        }else{
            if($this->cadastrar($msg)){
                $this->enviarNotificacao($msg);
            }
        }
    }
    
    private function cadastrar($msg){
        
        $msg->setCampo('entidade', 'Seguir');
        $msg->setCampo('Seguir::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
    
    private function enviarNotificacaoSeguindo($msg){
        
        $usuarioAcaoId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioId = $msg->getCampo('Seguir::usuarioSeguirId')->get('valor');
        
        $msg->setCampo('entidade', 'Notificacoes');
        $msg->setCampo('Notificacoes::usuarioId', $usuarioId);
        $msg->setCampo('Notificacoes::usuarioAcaoId', $usuarioAcaoId);
        $msg->setCampo('Notificacoes::tipoId', 5);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
    
    private function enviarNotificacao($msg){
        
        $usuarioAcaoId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioId = $msg->getCampo('Seguir::usuarioSeguirId')->get('valor');
        $msg->setCampo('entidade', 'Notificacoes');
        $msg->setCampo('Notificacoes::usuarioId', $usuarioId);
        $msg->setCampo('Notificacoes::usuarioAcaoId', $usuarioAcaoId);
        $msg->setCampo('Notificacoes::tipoId', 1);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
