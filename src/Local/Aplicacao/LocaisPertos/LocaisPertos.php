<?php
namespace Quickpeek\Local\Aplicacao\LocaisPertos;
use Rubeus\ContenerDependencia\Conteiner;

class LocaisPertos {
    
    public function locaisPertos($msg){
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $file = file_get_contents('https://maps.googleapis.com/maps/api/place/nearbysearch/json?' . 
                'location=' . $latitude . ',' . $longitude .  
                '&rankby=distance&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
        
        $json = json_decode($file);
        
        $query = Conteiner::get('ConsultaLocalGoogle');
        $cadastro = Conteiner::get('Cadastro');
        foreach($json->results as $v){
            $id = $query->consultar($v->place_id);
            if(!$id){
                $file2 = file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?' . 
                'placeid=' . $v->place_id . '&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
                $json2 = json_decode($file2);
                $placeId[] = $v->place_id;
                $name[] = $v->name;
                $lat[] = $v->geometry->location->lat;
                $lng[] = $v->geometry->location->lng;
                $endereco[] = $json2->result->formatted_address;
                $tipos[] = $v->types;
            }
        }
        
        if($placeId){
            $msg->setCampo('entidade', 'Local');
            $msg->setCampo('Local::titulo', $name);
            $msg->setCampo('Local::latitude', $lat);
            $msg->setCampo('Local::longitude', $lng);
            $msg->setCampo('Local::endereco', $endereco);
            $result = $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
        
        $locaisId = $msg->getCampo('Local::id')->get('valor');
        foreach($locaisId as $k=>$id){
            $this->setarLocalCategoria($tipos[$k], $id, $msg);
        }
        
        if($result){
            $msg->setCampo('entidade', 'LocalGoogle');
            $msg->setCampo('LocalGoogle::placeId', $placeId);
            $msg->setCampo('LocalGoogle::localId', $msg->getCampo('Local::id')->get('valor'));
            $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function setarLocalCategoria($tipos, $localId, $msg){
        
        $outros = false;
        
        foreach($tipos as $tipo){
            if($tipo == 'bank' || $tipo == 'atm'){
                $outros = 1;
                $categoriaId[] = 1;
                $locaisId[] = $localId;
            }
            if($tipo == 'bar' || $tipo == 'liquor_store'){
                $outros = 1;
                $categoriaId[] = 2;
                $locaisId[] = $localId;
            }
            if($tipo == 'cafe'){
                $outros = 1;
                $categoriaId[] = 3;
                $locaisId[] = $localId;
            }
            if($tipo == 'restaurant' || $tipo == 'food'){
                $outros = 1;
                $categoriaId[] = 4;
                $locaisId[] = $localId;
            }
            if($tipo == 'restaurant' || $tipo == 'food'){
                $outros = 1;
                $categoriaId[] = 5;
                $locaisId[] = $localId;
            }
            if($tipo == 'restaurant' || $tipo == 'food'){
                $outros = 1;
                $categoriaId[] = 6;
                $locaisId[] = $localId;
            }
            if($tipo == 'night_club' || $tipo == 'bar'){
                $outros = 1;
                $categoriaId[] = 7;
                $locaisId[] = $localId;
            }
            if($tipo == 'shopping_mall'){
                $outros = 1;
                $categoriaId[] = 8;
                $locaisId[] = $localId;
            }
            if($tipo == 'night_club'){
                $outros = 1;
                $categoriaId[] = 9;
                $locaisId[] = $localId;
            }
            if($tipo == 'point_of_interest'){
                $outros = 1;
                $categoriaId[] = 10;
                $locaisId[] = $localId;
            }
            if($tipo == 'bicycle_store' || $tipo == 'book_store' || $tipo == 'clothing_store'
                    || $tipo == 'convenience_store' || $tipo == 'department_store' || $tipo == 'eletronics_store'
                    || $tipo == 'furniture_store' || $tipo == 'grocery_or_supermarket' || $tipo == 'hardware_store'
                    || $tipo == 'jewelry_store'|| $tipo == 'pet_store'|| $tipo == 'pharmacy' || $tipo == 'shoe_store'){
                $outros = 1;
                $categoriaId[] = 11;
                $locaisId[] = $localId;
            }
            if($tipo == 'bakery'){
                $outros = 1;
                $categoriaId[] = 12;
                $locaisId[] = $localId;
            }
            if($tipo == 'health'){
                $outros = 1;
                $categoriaId[] = 13;
                $locaisId[] = $localId;
            }
            if($tipo == 'hospital' || $tipo == 'health'){
                $outros = 1;
                $categoriaId[] = 14;
                $locaisId[] = $localId;
            }
            if($tipo == 'city_hall' || $tipo == 'courthouse' || $tipo == 'library' || $tipo == 'local_government_office'
                    || $tipo == 'police' || $tipo == 'post_office' || $tipo == 'school' || $tipo == 'university'){
                $outros = 1;
                $categoriaId[] = 15;
                $locaisId[] = $localId;
            }
            if(!$outros){
                $categoriaId[] = 16;
                $locaisId[] = $localId;
            }
            $msg->setCampo('entidade', 'LocalCategoria');
            $msg->setCampo('LocalCategoria::localId', $locaisId);
            $msg->setCampo('LocalCategoria::categoriaId', $categoriaId);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}