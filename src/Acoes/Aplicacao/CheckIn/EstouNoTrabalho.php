<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class EstouNoTrabalho {
    
    public function estouNoTrabalho($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $casaTrabalhoId = Conteiner::get('ConsultaCasaTrabalho')->consultarId($usuarioId);
        if($casaTrabalhoId){
            $entidade = ConteinerEntidade::getInstancia('CasaTrabalho');
            $entidade->setId($casaTrabalhoId);
            $entidade->deletar();
        }
        $msg->setCampo('entidade', 'CasaTrabalho');
        $msg->setCampo('CasaTrabalho::latitudeTrabalho', $latitude);
        $msg->setCampo('CasaTrabalho::longitudeTrabalho', $longitude);
        $msg->setCampo('CasaTrabalho::casa', 0);
        $msg->setCampo('CasaTrabalho::trabalho', 1);
        $msg->setCampo('CasaTrabalho::usuarioId', $usuarioId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}