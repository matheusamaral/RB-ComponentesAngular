<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class SetarEntregue {
    
    public function setarEntregue($msg){
        
        $mensagensId = $msg->getCampo('Mensagens::id')->get('valor');
        
        foreach($mensagensId as $v){
            $status[] = 2;
        }
        
        $msg->setCampo('entidade', 'Mensagens');
        $msg->setCampo('Mensagens::statusMensagemId', $status);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
