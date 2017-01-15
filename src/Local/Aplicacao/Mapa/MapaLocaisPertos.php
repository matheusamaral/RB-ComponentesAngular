<?php
namespace Quickpeek\Local\Aplicacao\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class MapaLocaisPertos {
    
    public function mapaLocaisPertos($msg){
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        $usuarioId = $msg->getCampo('dadosUsuarioLogado,id')->get('valor');
        
        $query = Conteiner::get('ConsultaMapaLocaisPertos')->consultar($latitude, $longitude, $usuarioId);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}