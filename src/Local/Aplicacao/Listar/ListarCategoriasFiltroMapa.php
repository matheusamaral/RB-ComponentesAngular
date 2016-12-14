<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarCategoriasFiltroMapa {
    
    public function listarCategoriasFiltroMapa($msg){
        
        $categoriaLocal = Conteiner::get('ConsultaListarCategoriasFiltro')->consultar();
        $categoriaHashtag = Conteiner::get('ConsultaListarCategoriasFiltro')->consultar2();
        
        $categorias = array_merge($categoriaLocal, $categoriaHashtag);
        
        if($categoriaLocal && $categoriaHashtag){
            $msg->setResultadoEtapa(true, false, ['dados'=>$categorias]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
