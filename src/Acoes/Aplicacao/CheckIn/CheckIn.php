<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class CheckIn {
    
    public function checkIn($msg){
        
        $msg->setCampo('entidade', 'CheckIn');
        $msg->setCampo('CheckIn::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
