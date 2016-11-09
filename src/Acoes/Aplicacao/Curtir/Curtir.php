<?php
namespace Quickpeek\Acoes\Aplicacao\Curtir;
use Rubeus\ContenerDependencia\Conteiner;

class Curtir {
    
    public function curtir($msg){
        
        $msg->setCampo('entidade', 'Curtir');
        $msg->setCampo('Curtir::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
