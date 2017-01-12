<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class CancelarSolicitacao {
    
    public function cancelarSolicitacao($msg){
        
        $seguirId = $msg->getCampo('Seguir::id')->get('valor');
        $entidade = ConteinerEntidade::getInstancia('Seguir');
        $entidade->setId($seguirId);
        $qtdErro = $entidade->deletar();
        
        if(!$qtdErro){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
