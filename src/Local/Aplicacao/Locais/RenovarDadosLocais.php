<?php
namespace Quickpeek\Local\Aplicacao\Locais;
use Rubeus\ContenerDependencia\Conteiner;

class RenovarDadosLocais {
    
    public function renovarDadosLocais($msg){
        
        $dados = Conteiner::get('ConsultaRenovarDadosLocais')->consultar();
        
        foreach($dados as $k=>$v){
            $locaisId[] = $v['localId'];
            $file = file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?placeid='
                    . $v['placeId'] . '&key=AIzaSyDdaeZSbFyyzMpjF32DzKeVXtJTRNYeMyo');
            $jsons[] = json_decode($file);
            var_dump('Renovado ' . $k);
        }
        
        foreach($jsons as $k=>$json){
            $nomes[] = $json->result->name;
            $endereco[] = $json->result->formatted_address;
            $momento[] = date('Y-m-d H:i:s');

            foreach($json->result->address_components as $v){
                if(in_array('locality', $v->types)){
                    $cidade[] = $v->long_name;
                }
                if(in_array('administrative_area_level_1', $v->types)){
                    $estado[] = $v->long_name;
                }
                if(in_array('country', $v->types)){
                    $pais[] = $v->long_name;
                }
            }
            if(!isset($cidade[$k])){
                foreach($json->result->address_components as $v){
                    if(in_array('administrative_area_level_2', $v->types)){
                        $cidade[$k] = $v->long_name;
                    }
                }
            }
        }
        
        if($nomes){
            $msg->setCampo('entidade', 'Local');
            $msg->setCampo('Local::id', $locaisId);
            $msg->setCampo('Local::titulo', $nomes);
            $msg->setCampo('Local::endereco', $endereco);
            $msg->setCampo('Local::momento', $momento);
            $msg->setCampo('Local::cidade', $cidade);
            $msg->setCampo('Local::estado', $estado);
            $msg->setCampo('Local::pais', $pais);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}