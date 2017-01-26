<?php
namespace Quickpeek\Usuario\Aplicacao\Notificacao;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class VincularUsuarioOneSignal {
    
    public function vincularUsuarioOneSignal($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $playerId = $msg->getCampo('PlayerId')->get('valor');
        
        $id = Conteiner::get('ConsultaVerificarUsuarioExistente')->consultar($usuarioId);
        
        if($id){
            $entidade = ConteinerEntidade::getInstancia('UsuarioOneSignal');
            $entidade->setId($id);
            $entidade->deletar();
        }
        
        $msg->setCampo('entidade', 'UsuarioOneSignal');
        $msg->setCampo('UsuarioOneSignal::usuarioId', $usuarioId);
        $msg->setCampo('UsuarioOneSignal::playerId', $playerId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}