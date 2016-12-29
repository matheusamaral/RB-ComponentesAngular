<?php
namespace Quickpeek\Local\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Cadastro {
    
    public function cadastro($msg){
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $file = file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?' . 
        'latlng=' . $latitude . ',' . $longitude . '&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
        
        $json = json_decode($file);
        
        if($json->status == 'OK'){
            $status = $this->cadastrarLocal($msg, $json, $latitude, $longitude);
            if($status){
                $this->cadastrarLocalCategoria($msg);
            }
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function cadastrarLocal($msg, $json, $latitude, $longitude){

        $endereco = $json->results[0]->formatted_address;
        foreach($json->results[0]->address_components as $v){
            if($v->types[0] == 'locality' && $v->types[1] == 'political'){
                $cidade = $v->long_name;
            }
        }
        $msg->setCampo('entidade', 'Local');
        $msg->setCampo('Local::endereco', $endereco);
        $msg->setCampo('Local::cidade', $cidade);
        $msg->setCampo('Local::latitude', $latitude);
        $msg->setCampo('Local::longitude', $longitude);
        $msg->setCampo('Local::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
    
    private function cadastrarLocalCategoria($msg){
        
        $localId = $msg->getCampo('Local::id')->get('valor');
        $categoriaId = $msg->getCampo('LocalCategoria::categoriaId')->get('valor');
        foreach($categoriaId as $v){
            $locaisId[] = $localId;
        }
        $msg->setCampo('entidade', 'LocalCategoria');
        $msg->setCampo('LocalCategoria::localId', $locaisId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
