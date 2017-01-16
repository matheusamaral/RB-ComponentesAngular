<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class EstouEmCasa{
    
    public function estouEmCasa($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $casaTrabalhoId = Conteiner::get('ConsultaCasaTrabalho')->consultarId($usuarioId);
        if($casaTrabalhoId){
            $msg->setCampo('CasaTrabalho::id', $casaTrabalhoId);
        }
        $msg->setCampo('entidade', 'CasaTrabalho');
        $msg->setCampo('CasaTrabalho::latitudeCasa', $latitude);
        $msg->setCampo('CasaTrabalho::longitudeCasa', $longitude);
        $msg->setCampo('CasaTrabalho::casa', 1);
        $msg->setCampo('CasaTrabalho::trabalho', 0);
        $msg->setCampo('CasaTrabalho::usuarioId', $usuarioId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}