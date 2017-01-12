<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class ExcluirMidia {
    
    public function excluirMidia($msg){
        
        $midiaId = $msg->getCampo('Midia::id')->get('valor');
        $entidade = ConteinerEntidade::getInstancia('Midia');
        $entidade->setId($midiaId);
        $entidade->deletar();
        
        if(!$entidade->getQtdErro()){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}