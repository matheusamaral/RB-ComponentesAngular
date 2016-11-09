<?php
namespace Quickpeek\Usuario\Aplicacao\Bloqueado;
use Rubeus\ContenerDependencia\Conteiner;

class Bloquear {
    
    public function bloquear($msg){
        
        $msg->setCampo('entidade', 'Bloqueado');
        $msg->setCampo('Bloqueado::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}

