<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarUltimosLocais {
    
    public function listarUltimosLocais($msg){
        
        $usuarioId = $msg->getCampo('Usuario::id')->get('valor');
        
        if(!$usuarioId){
            $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        }
        
        $latitude = $msg->getCampo('Local::latitude')->get('valor');
        $longitude = $msg->getCampo('Local::longitude')->get('valor');
        $query = Conteiner::get('ConsultaListarUltimosLocais')->consultar($usuarioId, $latitude, $longitude);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
