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
        for($i = 1; $i <= 30; $i++){
            $usuarios[] = $i;
            if($i < 3){
                $visibilidade[] = 2;
                $local[] = 1;
            }elseif($i < 5){
                $visibilidade[] = 3;
                $local[] = 2;
            }elseif($i < 20){
                $visibilidade[] = 1;
                $local[] = 3;
            }elseif($i < 23){
                $visibilidade[] = 1;
                $local[] = 4;
            }elseif($i < 26){
                $visibilidade[] = 1;
                $local[] = 5;
            }elseif($i < 30){
                $visibilidade[] = 1;
                $local[] = 6;
            }elseif($i < 13){
                $visibilidade[] = 1;
                $local[] = 7;
            }elseif($i < 16){
                $visibilidade[] = 1;
                $local[] = 8;
            }else{
                $local[] = 10;
                $visibilidade[] = 1;
            }
        }
        
        $msg->setCampo('CheckIn::usuarioId', $usuarios);
        $msg->setCampo('CheckIn::localId', $local);
        $msg->setCampo('CheckIn::visibilidadeId', $visibilidade);
        $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        
        if($cad){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
