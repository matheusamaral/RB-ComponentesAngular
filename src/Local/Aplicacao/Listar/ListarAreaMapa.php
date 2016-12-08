<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarAreaMapa {
    
    public function listarAreaMapa($msg){
        
        $localId = $msg->getCampo('Local::id')->get('valor');
        if($localId){
            $posicaoLocal = Conteiner::get('ConsultaPosicaoLocal')->consultar($localId);
            $latitude = $posicaoLocal['latitude'];
            $longitude = $posicaoLocal['longitude'];
        }else{
            $latitude = $msg->getCampo('Latitude')->get('valor');
            $longitude = $msg->getCampo('Longitude')->get('valor');
        }
        
        $locaisNotIn = $msg->getCampoSessao('locaisNotIn');
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $locaisNotIn);
        }else{
            $notIn = 0;
        }
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        
        $dadosLocais = Conteiner::get('ConsultaDadosLocais')->consultar($usuarioId, 
                $latitude, $longitude, $tempo['midia'], $tempo['hashtag'], $notIn);
        if($dadosLocais){
            foreach($dadosLocais as $v){
                $locaisId[] = $v['localId'];
            }
            if($atualizando){
                $locaisId = array_merge($locaisNotIn, $locaisId);
            }
            $msg->setCampoSessao('locaisNotIn', $locaisId);

            $hashtag = Conteiner::get('ConsultaHashtag');
            $midia = Conteiner::get('ConsultaMidia');
            $pessoa = Conteiner::get('ConsultaPessoa');
            $perguntas = Conteiner::get('ConsultaPerguntas');

            foreach($dadosLocais as $v){
                $hashtags[] = $hashtag->consultar($usuarioId, $v['localId'], $tempo['hashtag']);
                $midias[] = $midia->consultar($v['localId'], $tempo['midia']);
                $qtdMidia[] = $midia->consultarQtd($v['localId'], $tempo['midia']);
                $pessoas[] = $pessoa->consultar($usuarioId, $v['localId'], $tempo['midia'], $tempo['hashtag'], 3);
                $qtdPerguntas[] = $perguntas->consultarQtd($v['localId'], $tempo['perguntas']);
            }

            for($i = 0; $i < count($dadosLocais); $i++){
                $midias[$i][] = $qtdMidia[$i];
            }

            $array = [];

            foreach($dadosLocais as $k=>$v){
                $array['local ' . $k]['dados'] = $dadosLocais[$k];
                $array['local ' . $k]['hashtags'] = $hashtags[$k];
                $array['local ' . $k]['midias'] = $midias[$k];
                $array['local ' . $k]['pessoas'] = $pessoas[$k];
                $array['local ' . $k]['qtdPerguntas'] = $qtdPerguntas[$k];
            }
            $msg->setResultadoEtapa(true, false, ['dados'=>$array]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
