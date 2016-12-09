<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarAvatares {
    
    public function listarAvatares($msg){
        
        $query = Conteiner::get('ConsultaListarAvatares')->consultar();
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
