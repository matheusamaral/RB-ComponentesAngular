<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarAreaMapa {
    
    public function listarAreaMapa($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Local::id')->get('valor');
        
        $tempo = Conteiner::get('Consultar')->consultar();
        
        $hashtag = Conteiner::get('ConsultaHashtag');
        $midia = Conteiner::get('ConsultaMidia');
        $pessoa = Conteiner::get('ConsultaPessoa');
        $perguntas = Conteiner::get('ConsultaPerguntas');
        
        foreach($localId as $v){
            $hashtags[] = $hashtag->consultar($usuarioId, $v, $tempo['hashtag']);
            $midias[] = $midia->consultar($v, $tempo['midia']);
            $qtdMidia[] = $midia->consultarQtd($v, $tempo['midia']);
            $pessoas[] = $pessoa->consultar($usuarioId, $v, $tempo['midia'], $tempo['hashtag']);
            $qtdPerguntas[] = $perguntas->consultarQtd($v, $tempo['perguntas']);
        }
        
        foreach($pessoas as $k=>$value){
            foreach($value as $k2=>$pessoa){
                if($pessoa['usuarioId'] == $usuarioId){
                    $pessoas[$k][$k2]['cor'] = 1;
                }
            }
        }
        
        for($i = 0; $i < count($localId); $i++){
            $midias[$i][] = $qtdMidia[$i];
        }
        
        $distancias = $this->localizar($msg);
        
        foreach($localId as $k=>$v){
            $array['local' . $k]['hashtags'] = $hashtags[$k];
            $array['local' . $k]['midias'] = $midias[$k];
            $array['local' . $k]['pessoas'] = $pessoas[$k];
            $array['local' . $k]['qtdPerguntas'] = $qtdPerguntas[$k];
            $array['local' . $k]['dadosLocal'] = $distancias[$k];
        }
        
        if($array){
            $msg->setResultadoEtapa(true, false, ['dados'=>$array]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function localizar($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        $localId = $msg->getCampo('Local::id')->get('valor');
        
        $posicao = Conteiner::get('ConsultaPosicaoLocal');
        $local = Conteiner::get('ConsultaDadosLocal');
        $localizar = Conteiner::get('Localizar');
        
        foreach($localId as $v){
            $posicoes[] = $posicao->consultar($v);
            $dadosLocal[] = $local->consultar($v, $usuarioId);
        }
        
        foreach($dadosLocal as $k=>$v){
            if($v['distancia']){
                $distancia[] = $localizar->localizar($longitude, $posicoes[$k]['longitude'], 
                        $latitude, $posicoes[$k]['latitude']);
            }else{
                $distancia[] = 0;
            }
            $dadosLocal[$k]['distancia'] = $distancia[$k];
        }
        
        return $dadosLocal;
    }
}
