<?php
namespace Quickpeek;
use Rubeus\ContenerDependencia\Conteiner;

class LoginTeste {
    
    public function loginTeste($msg){
        var_dump($_SESSION);
        
        $msg->setCampoSessao('dadosUsuarioLogado,id', $msg->getCampo('Usuario::id')->get('valor'));
        $msg->setResultadoEtapa(true, false, ['sessao'=>$_SESSION]);
        
        var_dump($_SESSION);
//        $class = Conteiner::get('EstruturaSessao');
    }
}
