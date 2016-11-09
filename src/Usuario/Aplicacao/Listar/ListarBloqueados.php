<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarBloqueados {
    
    public function listarBloqueados($msg){
        
        $query = Conteiner::get('ConsultaListarBloqueados')->consultar($msg->getCampoSessao('dadosUsuarioLogado,id'));
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
