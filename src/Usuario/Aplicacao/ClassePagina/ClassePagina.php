<?php
namespace Quickpeek\Usuario\Aplicacao\ClassePagina;
use Rubeus\ContenerDependencia\Conteiner;

class ClassePagina extends \Rubeus\Navegacao\ClassePagina {
    
    public function regraAcesso($id){

        $msg = Conteiner::get('Mensagem');
        $sessao = $msg->getCampoSessao('dadosUsuarioLogado,id');
        if($sessao){
            return $id;
        }else{
            return 2;
        }
    }
}
