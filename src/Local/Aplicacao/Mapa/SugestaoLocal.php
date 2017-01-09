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
                $msg->setResultadoEtapa(true, false, ['dados'=>$sugestao]);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
    }
}