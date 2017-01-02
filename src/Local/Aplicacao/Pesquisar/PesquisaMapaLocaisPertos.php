<?php
namespace Quickpeek\Local\Aplicacao\Pesquisar;
use Rubeus\ContenerDependencia\Conteiner;

class PesquisaMapaLocaisPertos {
    
    public function pesquisaMapaLocaisPertos($msg){
        
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        $nome = $msg->getCampo('Nome')->get('valor');
        if(!$nome){
            $nome = "";
        }
        $pesquisa = Conteiner::get('ConsultaPesquisaMapaLocaisPertos')->consultar($latitude, $longitude, $nome);
        if($pesquisa){
            $msg->setResultadoEtapa(true, false, ['dados'=>$pesquisa]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}