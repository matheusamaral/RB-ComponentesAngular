<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class Hashtag {
    
    public function hashtag($msg){
        
        $session = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $localId = $msg->getCampo('HashtagLocal::localId')->get('valor');
        $catHashId = $msg->getCampo('HashtagCategoria::categoriaHashtagId')->get('valor');
        
        $cadastro = Conteiner::get('Cadastro');
                
        $msg->setCampo('entidade', 'Hashtag');
        $msg->setCampo('Hashtag::usuarioId', $session);
        $cadastro->cadastrar($msg);
        
        if($localId){
            $msg->setCampo('entidade', 'HashtagLocal');
            $msg->setCampo('HashtagLocal::usuarioId', $session);
            $msg->setCampo('HashtagLocal::hashtagId', $msg->getCampo('Hashtag::id')->get('valor'));
            $msg->setCampo('HashLocal::localId', $localId);
            $cadastro->cadastrar($msg);
        }
        
        if($catHashId){
            $msg->setCampo('entidade', 'HashtagCategoria');
            $msg->setCampo('HashtagCategoria::categoriaHashtagId', $catHashId);
            $msg->setCampo('HashtagCategoria::hashtagId', $msg->getCampo('Hashtag::id')->get('valor'));
            $cadastro->cadastrar($msg);
        }
    }
}
