<?php
namespace Quickpeek\Usuario\Aplicacao\DadosBanco;
use Rubeus\ContenerDependencia\Conteiner;

class SetarDadosBanco {
    
    public function setarDadosBanco($msg){
        
        $resourceId = $msg->getCampo('ResourceId')->get('valor');
        $pagina = $msg->getCampo('Pagina')->get('valor');
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $cmd = Conteiner::get('Socket');
        $cmd->setarDadosBanco($resourceId, $usuarioId, $pagina);
        $msg->setResultadoEtapa(true, false, ['from'=>$usuarioId, 'pagina'=>$pagina]);
    }
}