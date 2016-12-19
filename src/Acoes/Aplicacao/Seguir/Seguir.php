<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class Seguir {
    
    public function seguir($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $query = Conteiner::get('ConsultaSeguir')->consultar($usuarioId, $msg->getCampo('Seguir::usuarioSeguirId')->get('valor'));
        
        if(!$query['id']){
            if($query['padraoAprovacao'] == 0){
                $msg->setCampo('Seguir::confirmarSeguir', 1);
                $msg->setCampo('Seguir::momentoConfirmarSeguir', date('Y-m-d H:i:s'));
            }else{
                $this->enviarNotificacao($msg);
            }
            $msg->setCampo('entidade', 'Seguir');
            $msg->setCampo('Seguir::usuarioId', $usuarioId);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
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
