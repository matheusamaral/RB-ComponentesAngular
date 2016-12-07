<?php
namespace Quickpeek\Local\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Cadastro {
    
    public function cadastro($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $file = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?' . 
        'latlng=' . $latitude . ',' . $longitude . '&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
        
        $json = json_decode($file);
        
        if($json->status == 'OK'){
            $endereco = $json->results[0]->formatted_address;
        }else{
            $endereco = null;
        }
        
        $msg->setCampo('entidade', 'Local');
        $msg->setCampo('Local::numero', $endereco);
        $msg->setCampo('Local::latitude', $latitude);
        $msg->setCampo('Local::longitude', $longitude);
        $msg->setCampo('Local::usuarioId', $usuarioId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
