<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConfirmarSeguir {
    
    public function confirmarSeguir($msg){
        
        $msg->setCampo('entidade', 'Seguir');
        $msg->setCampo('Seguir::confirmarSeguir', 1);
        $msg->setCampo('Seguir::momentoConfirmarSeguir', date('Y-m-d H:i:s'));
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}