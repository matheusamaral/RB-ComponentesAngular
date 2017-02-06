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
                $cad = $this->cadastrarLocalCategoria($msg);
                if($cad){
                    $msg->setResultadoEtapa(true, false, ['dados'=>$msg->getCampo('Local::id')->get('valor')]);
                }else{
                    $msg->setResultadoEtapa(false);
                }
            }
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function cadastrarLocal($msg, $json, $latitude, $longitude){

        $endereco = $json->results[0]->formatted_address;
        foreach($json->results[0]->address_components as $v){
            if($v->types[0] == 'locality'){
                $cidade = $v->long_name;
            }
            if($v->types[0] == 'administrative_area_level_1'){
                $estado = $v->long_name;
            }
            if($v->types[0] == 'country'){
                $pais = $v->long_name;
            }
        }
        if(!isset($cidade)){
            foreach($json->results[0]->address_components as $v){
                if($v->types[0] == 'administrative_area_level_2'){
                    $cidade = $v->long_name;
                }
            }
        }
        $msg->setCampo('entidade', 'Local');
        $msg->setCampo('Local::endereco', $endereco);
        $msg->setCampo('Local::cidade', $cidade);
        $msg->setCampo('Local::estado', $estado);
        $msg->setCampo('Local::pais', $pais);
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
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
