<?php
namespace Quickpeek\Acoes\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarPerguntas {
    
    public function listarPerguntas($msg){
        
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        $query = Conteiner::get('ConsultaListarPerguntas')->consultar($localId);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
