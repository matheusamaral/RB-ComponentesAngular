<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class Hashtag {
    
    public function hashtag($msg){
        
        $hashtag = $msg->getCampo('Hashtag::titulo')->get('valor');
        
        $cadastro = Conteiner::get('Cadastro');
        $consultaHash = Conteiner::get('ConsultaHashtag');
        $hashtagId = [];
        
        foreach($hashtag as $v){
            $query = $consultaHash->consultar($v);
            $hashtagId[] = $query;
            if(!$query){
                $hashtagTitulo[] = $v;
            }
            $usuarioId[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
            $localId[] = $msg->getCampoSessao('dadosUsuarioLogado,local');
        }
        
        foreach($hashtagTitulo as $v){
            $usuarioIdNovo[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
        }
        
        if($hashtagTitulo){
            $msg->setCampo('entidade', 'Hashtag');
            $msg->setCampo('Hashtag::usuarioId', $usuarioIdNovo);
            $msg->setCampo('Hashtag::titulo', $hashtagTitulo);
            $cadastro->cadastrar($msg);
            $hashtagIdNovo = $msg->getCampo('Hashtag::id')->get('valor');
            
            for($i = 0; $i < count($hashtagId); $i++){
                if(!$hashtagId[$i]){
                    $hashtagId[$i] = $hashtagIdNovo[$i];
                }
            }
        }
        
        $msg->setCampo('entidade', 'HashtagLocal');
        $msg->setCampo('HashtagLocal::hashtagId', $hashtagId);
        $msg->setCampo('HashtagLocal::localId', $localId);
        $msg->setCampo('HashtagLocal::usuarioId', $usuarioId);
        $situacao = $cadastro->cadastrar($msg);
        
        if($situacao){
            $msg->setCampo('entidade', 'HashtagCategoria');
            $msg->setCampo('HashtagCategoria::hashtagId', $hashtagId);
            $situacao2 = $cadastro->cadastrar($msg);
            if(!$situacao2){
                $msg->setResultadoEtapa(false);
            }
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
