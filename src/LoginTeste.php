<?php
namespace Quickpeek;
use Rubeus\ContenerDependencia\Conteiner;

class LoginTeste {
    
    public function loginTeste($msg){
        
        $msg->setCampoSessao('dadosUsuarioLogado,id', $msg->getCampo('Usuario::id')->get('valor'));
        $msg->setResultadoEtapa(true, false, ['sessao'=>$_SESSION]);
//        $this->checkIn($msg);
    }
    
    public function checkIn($msg){
        
        $msg->setCampo('entidade', 'CheckIn');
        $msg->setCampo('CheckIn::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        $msg->setCampo('CheckIn::localId', 1);
        $msg->setCampo('CheckIn::visibilidadeId', 2);
        $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        
        if($cad){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
