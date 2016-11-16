<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Tutorial {
    
    public function tutorial($msg){
        
        $msg->setCampo('entidade', 'Usuario');
        $msg->setCampo('Usuario::tutorial', 1);
        $msg->setCampo('Usuario::id', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}