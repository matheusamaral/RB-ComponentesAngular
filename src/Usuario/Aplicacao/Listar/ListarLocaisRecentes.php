<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarLocaisRecentes {
    
    public function listarLocaisRecentes($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $latitude = $msg->getCampo('Local::latitude')->get('valor');
        $longitude = $msg->getCampo('Local::longitude')->get('valor');
        
        $query = Conteiner::get('ConsultaListarLocaisRecentes')->consultar($usuarioId, $latitude, $longitude);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}