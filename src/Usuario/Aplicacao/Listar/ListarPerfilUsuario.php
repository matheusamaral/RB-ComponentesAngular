<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarPerfilUsuario {
    
    public function listarPerfilUsuario($msg){
        
        $usuarioId = $msg->getCampo('Usuario::id')->get('valor');
        $usuarioIdSessao = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        if(!$usuarioId){
            $usuarioId = $usuarioIdSessao;
        }
        
        $query = Conteiner::get('ConsultaListarPerfilUsuario')->consultar($usuarioId, $usuarioIdSessao);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtap(false);
        }
    }
}