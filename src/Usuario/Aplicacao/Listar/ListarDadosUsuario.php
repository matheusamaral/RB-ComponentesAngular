<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarDadosUsuario {
    
    public function listarDadosUsuario($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $query = Conteiner::get('ConsultaListarDadosUsuario')->consultar($usuarioId);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else if($msg->getCampoSessao('dadosUsuarioLogado')){
            $msg->setResultadoEtapa(true, false, ['dados'=>$msg->getCampoSessao('dadosUsuarioLogado')]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
