<?php
namespace Quickpeek\Usuario\Aplicacao\Internet;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class DesligarGps {
    
    public function desligarGps($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $checkIn = ConteinerEntidade::getInstancia('CheckIn');
        $casaTrabalho = ConteinerEntidade::getInstancia('CasaTrabalho');
        
        $query = Conteiner::get('ConsultaDesligarGps');
        $checkInId = $query->consultarCheckInId($usuarioId);
        $casaTrabalhoId = $query->consultarCasaTrabalhoId($usuarioId);
        
        if($checkInId){
            $checkIn->setId($checkInId);
            $checkIn->setPresente(0);
            $checkIn->salvar();
        }

        if($casaTrabalhoId){
            $casaTrabalho->setId($casaTrabalhoId);
            $casaTrabalho->setDesconectado(1);
            $casaTrabalho->setAtivo(0);
            $casaTrabalho->salvar();
        }
        $msg->setResultadoEtapa(true);
    }
}