<?php
namespace Quickpeek\Usuario\Aplicacao\Editar;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class ApagarConta {
    
    public function apagarConta($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $telefone = $msg->getCampo('Usuario::telefone')->get('valor');
        
        $query = Conteiner::get('ConsultaApagarConta')->consultar($usuarioId, $telefone);
        if($query){
            $entidade = ConteinerEntidade::getInstancia('Usuario');
            $entidade->setId($usuarioId);
            $entidade->deletar();
            if(!$entidade->getErro()){
                $msg->setResultadoEtapa(true);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}