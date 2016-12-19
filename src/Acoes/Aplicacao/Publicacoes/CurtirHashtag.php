<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class CurtirHashtag {
    
    public function curtirHashtag($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampoSessao('dadosUsuarioLogado,local');
        $hashtagId = $msg->getCampo('HashtagLocal::hashtagId')->get('valor');
        
        $descurtir = Conteiner::get('ConsultaDescurtirHashtag')->consultar($usuarioId, $hashtagId, $localId);
        
        if(!$descurtir){
            $msg->setCampo('entidade', 'HashtagLocal');
            $msg->setCampo('HashtagLocal::usuarioId', $usuarioId);
            $msg->setCampo('HashtagLocal::localId', $localId);
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