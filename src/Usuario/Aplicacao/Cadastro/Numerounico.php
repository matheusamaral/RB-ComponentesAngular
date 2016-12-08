<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Numerounico {
    
    public function numerounico($msg){
        
        $numeroUnico = $msg->getCampo('Numerounico')->get('valor');
        
        $msg->setCampo('entidade', 'NumerounicoUsuario');
        $msg->setCampo('NumerounicoUsuario::numerounico', $numeroUnico);
        $result = Conteiner::get('Cadastro')->cadastrar($msg);
        
        if($result){
            $msg->setCampoSessao('numerounico', $numeroUnico);
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}