<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarCategoriasLocal {
    
    public function listarCategoriasLocal($msg){
        
        $categorias= Conteiner::get('ConsultaListarCategoriasFiltro')->consultar();
        
        if($categorias){
            $msg->setResultadoEtapa(true, false, ['dados'=>$categorias]);
        }
    }
}