<?php
namespace Quickpeek;

class LoginTeste {
    
    public function loginTeste($msg){
        
        $msg->setCampoSessao('dadosUsuarioLogado,id', $msg->getCampo('Usuario::id')->get('valor'));
        $msg->setResultadoEtapa(true, false, ['sessao'=>$msg->getCampoSessao('dadosUsuarioLogado,id')]);
    }
}