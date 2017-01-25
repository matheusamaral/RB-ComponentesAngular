<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagens;
use Rubeus\ContenerDependencia\Conteiner;

class SetarMensagemEntregue {
    
    public function setarMensagemEntregue($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
    }
}