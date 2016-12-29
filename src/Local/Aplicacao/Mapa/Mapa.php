<?php
namespace Quickpeek\Local\Aplicacao\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class Mapa {
    
    public function mapa($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        
        $categorias = $msg->getCampo('Categorias')->get('valor');
        if(!$categorias){
            
            $query = Conteiner::get('ConsultaMapa')->consultar($usuarioId, $latitude, $longitude, 
                    $tempo['hashtag'], $tempo['midia']);
        }else{
            
            $tipos = $msg->getCampo('Tipos')->get('valor');
            foreach($categorias as $k=>$v){
                if($tipos[$k] == 0){
                    $categoriaHashtag[] = 0;
                    $categoriaLocal[] = $v;
                }else{
                    $categoriaLocal[] = 0;
                    $categoriaHashtag[] = $v;
                }
            }
            
            $categoriaLocal = implode(', ', $categoriaLocal);
            $categoriaHashtag = implode(', ', $categoriaHashtag);
            
            $query = Conteiner::get('ConsultaMapaFiltro')->consultar($usuarioId, $latitude, $longitude, 
                    $tempo['hashtag'], $tempo['midia'], $categoriaLocal, $categoriaHashtag);
        }
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}