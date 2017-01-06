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
        $tipos = $msg->getCampo('Tipos')->get('valor');
        $notIn = $this->atualizando($msg);
        if(!$categorias && !$tipos){
            $query = Conteiner::get('ConsultaMapa')->consultar($usuarioId, $latitude, $longitude, 
                    $tempo['hashtag'], $tempo['midia'], $notIn);
            
        }else{
            $query = $this->filtro($msg, $latitude, $longitude, $usuarioId, $tempo, $notIn);
        }
        
        if($query){
            foreach($query as $v){
                $locaisId[] = $v['localId'];
            }
            if($notIn){
                $locaisId = array_merge($msg->getCampoSessao('locaisMapaNotIn'), $locaisId);
            }
            $msg->setCampoSessao('locaisMapaNotIn', $locaisId);
            
            $query = $this->fotoLocais($query, $tempo['hashtag']);
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function fotoLocais($query, $tempoHashtag){
        
        foreach($query as $v){
            $locaisId[] = $v['localId'];
        }
        $locaisId = implode(', ', $locaisId);
        $queryMapa = Conteiner::get('ConsultaMapa')->consultaFoto($locaisId, $tempoHashtag);
        
        foreach($queryMapa as $v){
            foreach($query as $k=>$value){
                if($v['localId'] == $value['localId']){
                    $query[$k]['categoriaHashtagEndereco'] = $v['categoriaHashtagEndereco'];
                    $query[$k]['categoriaLocalEndereco'] = $v['categoriaLocalEndereco'];
                }
            }
        }
        return $query;
    }
    
    private function filtro($msg, $latitude, $longitude, $usuarioId, $tempo, $notIn){
        
        $categorias = $msg->getCampo('Categorias')->get('valor');
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
                $tempo['hashtag'], $tempo['midia'], $notIn, $categoriaLocal, $categoriaHashtag);
        
        return $query;
    }
    
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $msg->getCampoSessao('locaisMapaNotIn'));
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
}