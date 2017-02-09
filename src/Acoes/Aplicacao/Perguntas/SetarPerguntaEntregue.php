<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class SetarPerguntaEntregue {
    
    public function setarPerguntaEntregue($msg){
        
        $msg->setCampo('entidade', 'PerguntaUsuario');
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}