<?php
namespace Quickpeek\Base;
use Rubeus\ContenerDependencia\Conteiner;

class LocaisBase {
    
    public function locaisBase($msg){
        
        for($i = 0; $i <= 5000; $i++){
            $lati[] = '-' . rand(1, 28) . '.' . rand(1, 9) . rand(1, 9) . rand(1, 9) . rand(1, 9);
            $lon[] = '-' . rand(39, 57) . '.' . rand(1, 9) . rand(1, 9) . rand(1, 9) . rand(1, 9);
        }
        
        foreach($lati as $k=>$v){
            var_dump('entrou');
            $file = file_get_contents('https://maps.googleapis.com/maps/api/place/nearbysearch/json?' . 
                    'location=' . $v . ',' . $lon[$k].  
                    '&rankby=distance&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
            $json[] = json_decode($file);
        }
        
        $query = Conteiner::get('ConsultaLocalGoogle');
        $cadastro = Conteiner::get('Cadastro');
        foreach($json as $value){
            var_dump('executando');
            if($value->status == 'OK'){
                foreach($value->results as $v){
                    $id = $query->consultar($v->place_id);
                    if(!$id){
                        $placeId[] = $v->place_id;
                        $name[] = $v->name;
                        $endereco[] = $v->vicinity;
                        $lat[] = $v->geometry->location->lat;
                        $lng[] = $v->geometry->location->lng;
                        $tipos[] = $v->types;
                    }
                }
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
        
        if(isset($placeId)){
            $msg->setCampo('entidade', 'Local');
            $msg->setCampo('Local::titulo', $name);
            $msg->setCampo('Local::latitude', $lat);
            $msg->setCampo('Local::longitude', $lng);
            $msg->setCampo('Local::endereco', $endereco);
            $result = $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
        
        if(isset($result)){
            $locaisId = $msg->getCampo('Local::id')->get('valor');
            foreach($locaisId as $k=>$id){
                $this->setarLocalCategoria($name[$k], $tipos[$k], $id, $msg);
            }
            $msg->setCampo('entidade', 'LocalGoogle');
            $msg->setCampo('LocalGoogle::placeId', $placeId);
            $msg->setCampo('LocalGoogle::localId', $msg->getCampo('Local::id')->get('valor'));
            $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
     private function setarLocalCategoria($nome, $tipos, $localId, $msg){
        
        $categoria1 = false;$categoria2 = false;$categoria3 = false;$categoria4 = false;$categoria5 = false;
        $categoria6 = false;$categoria7 = false;$categoria8 = false;$categoria9 = false;$categoria10 = false;
        $categoria11 = false;$categoria12 = false;$categoria13 = false;$categoria14 = false;$categoria15 = false;
        $categoria16 = false;$outros = false;
        
        foreach($tipos as $tipo){
            if(($tipo == 'bank' || $tipo == 'atm') && !$categoria1){
                $categoria1 = 1;
                $outros = 1;
                $categoriaId[] = 1;
                $locaisId[] = $localId;
            }
            
            if(($tipo == 'bar' || $tipo == 'liquor_store') && !$categoria2){
                $categoria2 = 1;
                $outros = 1;
                $categoriaId[] = 2;
                $locaisId[] = $localId;
            }
            
            if($tipo == 'cafe' && !$categoria3){
                $categoria3 = 1;
                $outros = 1;
                $categoriaId[] = 3;
                $locaisId[] = $localId;
            }
            
            if($tipo == 'restaurant' && !$categoria4){
                $categoria4 = 1;
                $outros = 1;
                $categoriaId[] = 4;
                $locaisId[] = $localId;
            }
            
            if((strpos($nome, 'Pizzaria') !== false || strpos($nome, 'pizzaria') !== false
                    || strpos($nome, 'Pizza') !== false || strpos($nome, 'pizza') !== false) && !$categoria5){
                $categoria5 = 1;
                $outros = 1;
                $categoriaId[] = 5;
                $locaisId[] = $localId;
            }
            
            if((strpos($nome, 'Churrascaria') !== false || strpos($nome, 'churrascaria') !== false
                    || strpos($nome, 'Churrasco') !== false || strpos($nome, 'churrasco') !== false) && !$categoria6){
                $categoria6 = 1;
                $outros = 1;
                $categoriaId[] = 6;
                $locaisId[] = $localId;
            }
            
            if(($tipo == 'night_club' || $tipo == 'bar') && !$categoria7){
                $categoria7 = 1;
                $outros = 1;
                $categoriaId[] = 7;
                $locaisId[] = $localId;
            }
            
            if($tipo == 'shopping_mall' && !$categoria8){
                $categoria8 = 1;
                $outros = 1;
                $categoriaId[] = 8;
                $locaisId[] = $localId;
            }
            
            if($tipo == 'night_club' && !$categoria9){
                $categoria9 = 1;
                $outros = 1;
                $categoriaId[] = 9;
                $locaisId[] = $localId;
            }
            
            if((strpos($nome, 'Teatro') !== false || strpos($nome, 'teatro') !== false) && !$categoria10){
                $categoria10 = 1;
                $outros = 1;
                $categoriaId[] = 10;
                $locaisId[] = $localId;
            }
            
            if(($tipo == 'store' || $tipo == 'bicycle_store' || $tipo == 'book_store' || $tipo == 'clothing_store'
                    || $tipo == 'convenience_store' || $tipo == 'department_store' || $tipo == 'eletronics_store'
                    || $tipo == 'furniture_store' || $tipo == 'grocery_or_supermarket' || $tipo == 'hardware_store'
                    || $tipo == 'jewelry_store'|| $tipo == 'pet_store'|| $tipo == 'pharmacy' || $tipo == 'shoe_store')
                    && !$categoria11){
                $categoria11 = 1;
                $outros = 1;
                $categoriaId[] = 11;
                $locaisId[] = $localId;
            }
            
            if($tipo == 'bakery' && !$categoria12){
                $categoria12 = 1;
                $outros = 1;
                $categoriaId[] = 12;
                $locaisId[] = $localId;
            }
            
            if($tipo == 'gym' && !$categoria13){
                $categoria13 = 1;
                $outros = 1;
                $categoriaId[] = 13;
                $locaisId[] = $localId;
            }
            
            if(($tipo == 'hospital' || $tipo == 'health') && !$categoria14 && !$categoria13){
                $categoria14 = 1;
                $outros = 1;
                $categoriaId[] = 14;
                $locaisId[] = $localId;
            }
            
            if(($tipo == 'city_hall' || $tipo == 'courthouse' || $tipo == 'library' || $tipo == 'local_government_office'
                    || $tipo == 'police' || $tipo == 'post_office' || $tipo == 'school' || $tipo == 'university') && !$categoria15){
                $categoria15 = 1;
                $outros = 1;
                $categoriaId[] = 15;
                $locaisId[] = $localId;
            }
            
            if($tipo == 'health' && !$categoria16 && !$categoria13){
                $categoria16 = 1;
                $outros = 1;
                $categoriaId[] = 16;
                $locaisId[] = $localId;
            }
        }
        
        if(!$outros){
            $categoriaId = 17;
            $locaisId = $localId;
        }
        
        $msg->setCampo('entidade', 'LocalCategoria');
        $msg->setCampo('LocalCategoria::localId', $locaisId);
        $msg->setCampo('LocalCategoria::categoriaId', $categoriaId);
        Conteiner::get('Cadastro')->cadastrar($msg);
        $msg->setCampo('LocalCategoria::id', false);
     }
}