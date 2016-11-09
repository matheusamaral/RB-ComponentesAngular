<?php
namespace Quickpeek\Usuario\Aplicacao\Bloqueado;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class Desbloquear {
    
    public function desbloquear($msg){
        
        $query = Conteiner::get('ConsultaDesbloquear')->consultar(
                $msg->getCampoSessao('dadosUsuarioLogado,id'),
                $msg->getCampo('Bloqueado::usuarioBloqueadoId')->get('valor'),
                $msg->getCampo('Bloqueado::anonimo')->get('valor'));
        
        if($query){
            $entidade = ConteinerEntidade::getInstancia('Bloqueado');
            $entidade->setId($query['id']);
            $entidade->deletar();
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}

