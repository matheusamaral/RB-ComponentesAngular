<?php
namespace Quickpeek;
use Rubeus\ContenerDependencia\Conteiner;

class LoginTeste {
    
    public function loginTeste($msg){
        
        $msg->setCampoSessao('dadosUsuarioLogado,id', $msg->getCampo('Usuario::id')->get('valor'));
        $msg->setResultadoEtapa(true, false, ['sessao'=>$_SESSION]);
        
//        $class = Conteiner::get('EstruturaSessao');
    }
}
