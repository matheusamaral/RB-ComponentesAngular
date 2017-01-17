<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class CurtirHashtag {
    
    public function curtirHashtag($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $hashtagId = $msg->getCampo('HashtagLocal::hashtagId')->get('valor');
        $categoriaId = $msg->getCampo('HashtagLocal::categoriaHashtagId')->get('valor');
        $localId = $msg->getCampo('Local::id')->get('valor');
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        
        $descurtir = Conteiner::get('ConsultaDescurtirHashtag')->consultar($usuarioId, $hashtagId, $localId, $tempo['hashtag']);
        
        if(!$descurtir){
            $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
            $cadastro = Conteiner::get('Cadastro');
            $msg->setCampo('entidade', 'HashtagLocal');
            $msg->setCampo('HashtagLocal::usuarioId', $usuarioId);
            $msg->setCampo('HashtagLocal::localId', $localId);
            $msg->setCampo('HashtagLocal::visibilidadeId', $visibilidadeId);
            $cadastro->cadastrar($msg);
            $msg->setCampo('entidade', 'HashtagCategoria');
            $msg->setCampo('HashtagCategoria::hashtagId', $hashtagId);
            $msg->setCampo('HashtagCategoria::categoriaHashtagId', $categoriaId);
            $cadastro->cadastrar($msg);
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