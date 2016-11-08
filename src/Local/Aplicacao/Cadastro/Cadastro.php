<?php
namespace Quickpeek\Local\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Cadastro {
    
    public function cadastro($msg){
        
        $msg->setCampo('entidade', 'Local');
        $msg->setCampo('Local::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
