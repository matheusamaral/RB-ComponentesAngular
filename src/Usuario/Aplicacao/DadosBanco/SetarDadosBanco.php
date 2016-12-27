<?php
namespace Quickpeek\Usuario\Aplicacao\DadosBanco;
use Rubeus\ContenerDependencia\Conteiner;

class SetarDadosBanco {
    
    public function setarDadosBanco($msg){
        
        $resourceId = $msg->getCampo('ResourceId')->get('valor');
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $cmd = Conteiner::get('Socket');
        $cmd->setarDadosBanco($resourceId, $usuarioId);
        $msg->setResultadoEtapa(true, false, ['from'=>$usuarioId]);
    }
}