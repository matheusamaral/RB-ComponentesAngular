<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class Seguir {
    
    public function seguir($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioSeguirId = $msg->getCampo('Seguir::usuarioSeguirId')->get('valor');
        
        $entidade = ConteinerEntidade::getInstancia('Seguir');
        $entidade->setUsuarioId($usuarioId);
        $entidade->setUsuarioSeguirId($usuarioSeguirId);
        $entidade->carregar();
        
        $contaPrivada = Conteiner::get('ConsultaContaPrivada')->consultar($usuarioSeguirId);
        
        if($contaPrivada == 0){
            $entidade->setConfirmarSeguir(1);
            $entidade->setMomentoConfirmarSeguir(date('Y-m-d H:i:s'));
            
            $this->enviarNotificacaoSeguindo($msg);
        }else{
            $this->enviarNotificacao($msg);
        }
        
        $entidade->setAtivo(1);
        $entidade->setMomento(date('Y-m-d H:i:s'));
        $entidade->salvar();
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
