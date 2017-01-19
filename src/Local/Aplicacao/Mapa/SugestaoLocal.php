<?php
namespace Quickpeek\Local\Aplicacao\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class SugestaoLocal {
    
    public function sugestaoLocal($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $query = Conteiner::get('ConsultaSugestaoLocal');
        $checkIn = $query->consultarCheckIn($usuarioId);
        if($checkIn){
            $msg->setResultadoEtapa(true, false, ['dados'=>$checkIn]);
        }else{
            $sugestao = $query->consultarSugestao($usuarioId, $msg->getCampo('Latitude')->get('valor'), $msg->getCampo('Longitude')->get('valor'));
            if($sugestao){
                $msg->setCampo('entidade', 'CheckIn');
                $msg->setCampo('CheckIn::usuarioId', $usuarioId);
                $msg->setCampo('CheckIn::localId', $sugestao['localId']);
                $msg->setCampo('CheckIn::visibilidadeId', 3);
                $msg->setCampo('CheckIn::automatico', 1);
                Conteiner::get('Cadastro')->cadastrar($msg);
                $msg->setCampoSessao('sugestaoCheckIn', $msg->getCampo('CheckIn::id')->get('valor'));
                $msg->setCampoSessao('sugestaoCheckInMomento', $msg->getCampo('CheckIn::momento')->get('valor'));
                $msg->setResultadoEtapa(true, false, ['dados'=>$sugestao]);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
    }
}