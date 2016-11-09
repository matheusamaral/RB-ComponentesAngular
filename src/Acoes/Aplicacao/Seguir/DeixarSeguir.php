<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class DeixarSeguir {
    
    public function deixarSeguir($msg){
        
        $query = Conteiner::get('ConsultaDeixarSeguir')->consultar(
                $msg->getCampoSessao('dadosUsuarioLogado,id'),
                $msg->getCampo('Seguir::usuarioSeguirId')->get('valor'));
        
        if($query){
            $entidade = ConteinerEntidade::getInstancia('Seguir');
            $entidade->setId($query['id']);
            $entidade->deletar();
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}