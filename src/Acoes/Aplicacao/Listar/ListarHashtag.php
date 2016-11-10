<?php
namespace Quickpeek\Acoes\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarHashtag {
    
    public function listarHashtag($msg){
        
        $query = Conteiner::get('ConsultaListarHashtag')->consultar($msg->getCampo('CategoriaHashtag::id')->get('valor'));
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
