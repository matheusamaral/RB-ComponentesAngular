<?php
namespace Quickpeek\Acoes\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarSeguidores {
    
    public function listarSeguidores($msg){
        
        $query = Conteiner::get('ConsultaListarSeguidores')->consultar($msg->getCampoSessao('dadosUsuarioLogado,id'));
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    public function listarQtdSeguidores($msg){
        
        $query = Conteiner::get('ConsultaListarSeguidores')->consultarQtd($msg->getCampoSessao('dadosUsuarioLogado,id'));
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}

