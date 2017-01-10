<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarAreaMapa {
    
    public function listarAreaMapa($msg){
        
        $localId = $msg->getCampo('Local::id')->get('valor');
        
        $posicaoLocal = Conteiner::get('ConsultaPosicaoLocal')->consultar($localId);
        $latitudeLocal = $posicaoLocal['latitude'];
        $longitudeLocal = $posicaoLocal['longitude'];
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $notIn = $this->atualizando($msg);
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        
        $dadosLocais = Conteiner::get('ConsultaDadosLocais')->consultar($usuarioId, 
                $latitude, $longitude, $latitudeLocal, $longitudeLocal, $tempo['midia'], $tempo['hashtag'], $notIn, $localId);
        
        if($dadosLocais){
            foreach($dadosLocais as $v){
                $locaisId[] = $v['localId'];
            }
            if($notIn){
                $locaisId = array_merge($msg->getCampoSessao('locaisNotIn'), $locaisId);
            }
            $msg->setCampoSessao('locaisNotIn', $locaisId);

            $hashtag = Conteiner::get('ConsultaHashtag');
            $midia = Conteiner::get('ConsultaMidia');
            $pessoa = Conteiner::get('ConsultaPessoa');
            $perguntas = Conteiner::get('ConsultaPerguntas');

            foreach($dadosLocais as $v){
                $hashtags[] = $hashtag->consultar($usuarioId, $v['localId'], $tempo['hashtag']);
                $midias[] = $midia->consultar($v['localId'], $tempo['midia']);
                $pessoas[] = $pessoa->consultar($usuarioId, $v['localId'], $tempo['midia'], $tempo['hashtag'], 3, 0);
                $qtdMidias[] = $midia->consultarQtd($v['localId'], $tempo['midia']);
                $qtdPerguntas[] = $perguntas->consultarQtd($v['localId'], $tempo['perguntas']);
                $qtdPessoas[]  = $pessoa->consultarQtd($v['localId']);
            }
            
            $array = [];

            foreach($dadosLocais as $k=>$v){
                $array[$k]['dados'] = $dadosLocais[$k];
                $array[$k]['hashtags'] = $hashtags[$k];
                $array[$k]['midias'] = $midias[$k];
                $array[$k]['pessoas'] = $pessoas[$k];
                $array[$k]['qtdPerguntas'] = $qtdPerguntas[$k];
                $array[$k]['qtdMidias'] = $qtdMidias[$k];
                $array[$k]['qtdPessoas'] = $qtdPessoas[$k];
            }
            $msg->setResultadoEtapa(true, false, ['dados'=>$array]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $msg->getCampoSessao('locaisNotIn'));
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
}
