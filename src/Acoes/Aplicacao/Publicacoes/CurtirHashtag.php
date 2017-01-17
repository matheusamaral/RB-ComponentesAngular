<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class CurtirHashtag {
    
    public function curtirHashtag($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $hashtagId = $msg->getCampo('HashtagLocal::hashtagId')->get('valor');
        $categoriaId = $msg->getCampo('HashtagCategoria::categoriaHashtagId')->get('valor');
        $localId = $msg->getCampo('Local::id')->get('valor');
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        
        $descurtir = Conteiner::get('ConsultaDescurtirHashtag')->consultar($usuarioId, $hashtagId, $localId, $tempo['hashtag']);
        
        if(!$descurtir){
            $msg->setCampo('entidade', 'HashtagLocal');
            $msg->setCampo('HashtagLocal::usuarioId', $usuarioId);
            $msg->setCampo('HashtagLocal::localId', $localId);
            $msg->setCampo('HashtagLocal::categoriaId', $categoriaId);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $entidade = ConteinerEntidade::getInstancia('HashtagLocal');
            $entidade->setId($descurtir);
            $entidade->deletar();
            
            if(!$entidade->getQtdErro()){
                $msg->setResultadoEtapa(true);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
    }
}