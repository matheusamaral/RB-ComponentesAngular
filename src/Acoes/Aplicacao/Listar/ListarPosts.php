<?php
namespace Quickpeek\Acoes\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarPosts {
    
    public function listarPosts($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $consultar = Conteiner::get('ConsultaListarPosts');
        $queryHash = $consultar->consultar($usuarioId, 'hashtag');
        $queryMidia = $consultar->consultar($usuarioId, 'midia');
        
        $posts = 0;
        
        foreach($queryHash as $k=>$v){
            $posts = $queryHash['count(id)'] + $queryMidia['count(id)'];
        }
        
        $msg->setResultadoEtapa(true, false, ['dados'=>$posts]);
    }
}