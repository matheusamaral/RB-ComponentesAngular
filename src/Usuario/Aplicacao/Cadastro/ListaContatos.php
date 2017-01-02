<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class ListaContatos {
    
    public function listaContatos($msg){
        
        $nome = $msg->getCampo('Nome')->get('valor');
    }
}