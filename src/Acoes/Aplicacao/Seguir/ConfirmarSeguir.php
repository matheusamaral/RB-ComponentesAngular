<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class ConfirmarSeguir {
    
    public function confirmarSeguir($msg){
        
        $aceitar = $msg->getCampo('Aceitar')->get('valor');
        
        if($aceitar){
            $msg->setCampo('entidade', 'Seguir');
            $msg->setCampo('Seguir::confirmarSeguir', 1);
            $msg->setCampo('Seguir::momentoConfirmarSeguir', date('Y-m-d H:i:s'));
            $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $entidade = ConteinerEntidade::getInstancia('Seguir');
            $entidade->setId($msg->getCampo('Seguir::id')->get('valor'));
            $qtdErro = $entidade->deletar();
        }
        
        if($cad){
            $this->enviarNotificacoes($msg);
        }elseif(!$qtdErro){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function enviarNotificacoes($msg){
        
        $seguirId = $msg->getCampo('Seguir::id')->get('valor');
        $dadosSeguir = Conteiner::get('ConsultaUsuarioSeguir')->consultar($seguirId);
        
        $usuariosNotificacao = [$dadosSeguir['usuarioId'], $dadosSeguir['usuarioSeguirId']];
        $usuariosAcao = [$dadosSeguir['usuarioSeguirId'], $dadosSeguir['usuarioId']];
        $tipos = [2, 5];
        
        $msg->setCampo('entidade', 'Notificacoes');
        $msg->setCampo('Notificacoes::usuarioId', $usuariosNotificacao);
        $msg->setCampo('Notificacoes::usuarioAcaoId', $usuariosAcao);
        $msg->setCampo('Notificacoes::tipoId', $tipos);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}