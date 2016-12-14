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
        
        $cadastro = Conteiner::get('Cadastro');
        
        $msg->setCampo('entidade', 'Local');
        $msg->setCampo('Local::endereco', $endereco);
        $msg->setCampo('Local::latitude', $latitude);
        $msg->setCampo('Local::longitude', $longitude);
        $msg->setCampo('Local::usuarioId', $usuarioId);
        $cad = $cadastro->cadastrar($msg);
        
        if($cad){
            $localId = $msg->getCampo('Local::id')->get('valor');
            $categoriaId = $msg->getCampo('LocalCategoria::categoriaId')->get('valor');
            
            foreach($categoriaId as $v){
                $locaisId[] = $localId;
            }
            $msg->setCampo('entidade', 'LocalCategoria');
            $msg->setCampo('LocalCategoria::localId', $locaisId);
            $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
