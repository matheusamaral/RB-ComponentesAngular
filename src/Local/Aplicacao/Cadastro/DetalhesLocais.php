<?php
namespace Quickpeek\Local\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class DetalhesLocais {
    
    public function detalhesLocais($msg){
        
        $query = $this->consultar();
        
        if($query){
            $i = 0;
            foreach($query as $value){
                foreach($value as $k=>$v){
                    if($k == 'placeId'){
                        $file = file_get_contents('https://maps.googleapis.com/maps/api/place/details/json?placeid=' . $v 
                                . '&key=AIzaSyBc3mboIyrPS1q7DIo-rEoDfRCLhskxRmc');
                        var_dump('file ' . $i);
                        $i++;
                        $json = json_decode($file);
                        if($json->status == "OK"){
                            $jsons[] = $json;
                        }
                    }
                }
            }
        }
        
        foreach($jsons as $k=>$json){
            $endereco[] = $json->result->formatted_address;

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
        
        if(isset($cidade)){
            $this->cadastrarLocais($msg, $query, $endereco, $cidade, $estado, $pais);
        }
    }
    
    private function consultar(){
        
        $query = Conteiner::get('Query');
        $query->select('distinct lg.place_id', 'placeId')
                ->add('l.id', 'localId');
        $query->from('local_google', 'lg');
        $query->join('local', 'l')
                ->on('l.cidade is null')
                ->on('l.estado is null')
                ->on('l.pais is null')
                ->on('l.ativo = 1');
        $query->where('lg.local_Id = l.id')
                ->add('lg.ativo = 1');
        $query->order('l.id');
        $query->limit(200);
        return $query->executar();
    }
    
    private function cadastrarLocais($msg, $query, $endereco, $cidade, $estado, $pais){
        
        foreach($query as $value){
            foreach($value as $k=>$v){
                if($k == 'localId'){
                    $locaisId[] = $v;
                }
            }
        }
        
        $msg->setCampo('entidade', 'Local');
        $msg->setCampo('Local::id', $locaisId);
        $msg->setCampo('Local::endereco', $endereco);
        $msg->setCampo('Local::cidade', $cidade);
        $msg->setCampo('Local::estado', $estado);
        $msg->setCampo('Local::pais', $pais);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}