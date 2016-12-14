<?php
namespace Quickpeek\Local\Aplicacao\Locais;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class ExcluirLocais {
    
    public function excluirLocais($msg){
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $locaisId = Conteiner::get('ConsultaExcluirLocais')->consultar($tempo['locais']);
        
        if($locaisId){
            $entidade = ConteinerEntidade::getInstancia('Local');
            $entidade->setId($locaisId);
            $entidade->deletar();
                    
            if(!$entidade->getQtdErro()){
                $msg->setResultadoEtapa(true, false, ['locaisId'=>$locaisId]);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }else{
            $msg->setResultadoEtapa(true);
        }
    }
}