<?php
namespace Quickpeek\Usuario\Aplicacao\Editar;
use Rubeus\ContenerDependencia\Conteiner;

class EditarAvatar {
    
    public function editarAvatar($msg){
        
        $msg->setCampo('entidade', 'Usuario');
        $msg->setCampo('Usuario::id', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}