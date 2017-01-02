<?php
namespace Quickpeek\Local\Aplicacao\Pesquisar;
use Rubeus\ContenerDependencia\Conteiner;

class PesquisarMapaLocaisPertos {
    
    public function pesquisarMapaLocaisPertos($msg){
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        $nome = $msg->getCampo('Nome')->get('valor');
        
        $pesquisa = Conteiner::get('ConsultaPesquisarMapaLocaisPertos')->consultar($latitude, $longitude, $nome);
        if($pesquisa){
            $msg->setResultadoEtapa(true, false, ['dados'=>$pesquisa]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}