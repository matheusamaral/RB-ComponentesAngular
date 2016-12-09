<?php
namespace Quickpeek\Local\Aplicacao\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class MapaLocaisPertos {
    
    public function mapaLocaisPertos($msg){
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        $query = Conteiner::get('ConsultaMapaLocaisPertos')->consultar($latitude, $longitude);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}