<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class CurtirMidia {
    
    public function curtirMidia($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $midiaId = $msg->getCampo('Curtir::midiaId')->get('valor');
        
        $descurtir = Conteiner::get('ConsultaDescurtirMidia')->consultar($usuarioId, $midiaId);
        
        if(!$descurtir){
            $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
            $msg->setCampo('entidade', 'Curtir');
            $msg->setCampo('Curtir::usuarioId', $usuarioId);
            $msg->setCampo('Curtir::visibilidadeId', $visibilidadeId);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $entidade = ConteinerEntidade::getInstancia('Curtir');
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
