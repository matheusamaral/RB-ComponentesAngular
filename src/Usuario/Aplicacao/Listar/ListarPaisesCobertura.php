<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarPaisesCobertura {
    
    public function listarPaisesCobertura($msg){
        
        $ddiPaises = Conteiner::get('ConsultaListarPaisesCobertura')->consultar();
        
        if($ddiPaises){
            $msg->setResultadoEtapa(true, false, ['dados'=>$ddiPaises]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}