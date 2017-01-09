<?php
namespace Quickpeek\Local\Aplicacao\Locais;
use Rubeus\ContenerDependencia\Conteiner;

class TempoViagem {
    
    public function tempoViagem($msg){
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        $localId = $msg->getCampo('LocalId')->get('valor');
        
        $posicaoLocal = Conteiner::get('ConsultaPosicaoLocal')->consultar($localId);
        
        $driving = file_get_contents('https://maps.googleapis.com/maps/api/distancematrix/json?' .
        'mode=driving&origins=' . $latitude . ',' . $longitude . '&destinations=' . 
        $posicaoLocal['latitude'] . ',' . $posicaoLocal['longitude'] . 
        '&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
        
        $bicycling = file_get_contents('https://maps.googleapis.com/maps/api/distancematrix/json?' .
        'mode=bicycling&origins=' . $latitude . ',' . $longitude . '&destinations=' . 
        $posicaoLocal['latitude'] . ',' . $posicaoLocal['longitude'] . 
        '&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
                
        $walking = file_get_contents('https://maps.googleapis.com/maps/api/distancematrix/json?' .
        'mode=walking&origins=' . $latitude . ',' . $longitude . '&destinations=' . 
        $posicaoLocal['latitude'] . ',' . $posicaoLocal['longitude'] . 
        '&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
        
        $driving = json_decode($driving);
        $bicycling = json_decode($bicycling);
        $walking = json_decode($walking);
        
        if($driving->status == 'OK'){
            $local['driving']['distancia']['texto'] = $driving->rows[0]->elements[0]->distance->text;
            $local['driving']['distancia']['valor'] = $driving->rows[0]->elements[0]->distance->value;
            $local['driving']['duracao']['texto'] = $driving->rows[0]->elements[0]->duration->value;
            $local['driving']['duracao']['valor'] = $driving->rows[0]->elements[0]->duration->value;
        }
        if($bicycling->status == 'OK'){
            $local['bicycling']['distancia']['texto'] = $bicycling->rows[0]->elements[0]->distance->text;
            $local['bicycling']['distancia']['valor'] = $bicycling->rows[0]->elements[0]->distance->value;
            $local['bicycling']['duracao']['texto'] = $bicycling->rows[0]->elements[0]->duration->value;
            $local['bicycling']['duracao']['valor'] = $bicycling->rows[0]->elements[0]->duration->value;
        }
        if($walking->status == 'OK'){
            $local['walking']['distancia']['texto'] = $walking->rows[0]->elements[0]->distance->text;
            $local['walking']['distancia']['valor'] = $walking->rows[0]->elements[0]->distance->value;
            $local['walking']['duracao']['texto'] = $walking->rows[0]->elements[0]->duration->value;
            $local['walking']['duracao']['valor'] = $walking->rows[0]->elements[0]->duration->value;
        }
        if(isset($local)){
            $msg->setResultadoEtapa(true, false, ['dados'=>$local]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}