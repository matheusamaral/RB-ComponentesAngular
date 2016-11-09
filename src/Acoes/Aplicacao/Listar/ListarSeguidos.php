<?php
namespace Quickpeek\Acoes\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarSeguidos{
    
    public function listarSeguidos($msg){
        
        $query = Conteiner::get('ConsultaListarSeguidos')->consultar($msg->getCampoSessao('dadosUsuarioLogado,id'));
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}

