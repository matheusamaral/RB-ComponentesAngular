<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarSeguidos{
    
    public function listarSeguidos($msg){
        
        $usuarioSessao = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioId = $msg->getCampo('Usuario::id')->get('valor');
        
        if(!$usuarioId){
            $usuarioId = $usuarioSessao;
        }
        
        $query = Conteiner::get('ConsultaListarSeguidos')->consultar($usuarioSessao, $usuarioId);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
