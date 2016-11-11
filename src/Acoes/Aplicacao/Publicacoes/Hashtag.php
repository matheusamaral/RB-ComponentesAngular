<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class Hashtag {
    
    public function hashtag($msg){
        
        $hashId = $msg->getCampo('Hashtag::id')->get('valor');
        $catHash = $msg->getCampo('HashtagCategoria::categoriaHashtagId')->get('valor');
        
        $cadastro = Conteiner::get('Cadastro');

        $array = $msg->getCampo('Hashtag::titulo')->get('valor');
        
        foreach($array as $v){
            $usuarioId[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
            $local[] = $msg->getCampoSessao('dadosUsuarioLogado,local');
        }
        
        $msg->setCampo('entidade', 'Hashtag');
        $msg->setCampo('Hashtag::usuarioId', $usuarioId);
        $suc = $cadastro->cadastrar($msg);
        
        if($suc){
            $msg->setCampo('entidade', 'HashtagLocal');
            $msg->setCampo('HashtagLocal::usuarioId', $usuarioId);
            $msg->setCampo('HashtagLocal::hashtagId', $msg->getCampo('Hashtag::id')->get('valor'));
            $msg->setCampo('HashtagLocal::localId', $local);
            $suc2 = $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
        
        if($suc2){
            $msg->setCampo('entidade', 'HashtagCategoria');
            
            for($i = 0; $i < count($hashId); $i++){
                $query[] = Conteiner::get('ConsultaHashtag')->consultar($catHash[$i], $hashId[$i]);
                
            }
            
            foreach($query as $v){
                $hashIdEdit[] = $v['id'];
            }
            
            if($query){
                $msg->setCampo('HashtagCategoria::id', $hashIdEdit);
            }
            
            $msg->setCampo('HashtagCategoria::hashtagId', $msg->getCampo('Hashtag::id')->get('valor'));
            $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
