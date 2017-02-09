<?php
namespace Quickpeek\Usuario\Aplicacao\Internet;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class VerificarUsuariosInternet {
    
    public function verificarUsuariosInternet($msg){
        
        $ids = Conteiner::get('ConsultaVerificarUsuariosInternet')->consultar();
        
        $checkIn = ConteinerEntidade::getInstancia('CheckIn');
        $casaTrabalho = ConteinerEntidade::getInstancia('CasaTrabalho');
        
        foreach($ids as $id){
            if($id['checkInId']){
                $checkIn->setId($id['checkInId']);
                $checkIn->setPresente(0);
                $checkIn->salvar();
            }
            
            if($id['casaTrabalhoId']){
                $casaTrabalho->setId($id['casaTrabalhoId']);
                $casaTrabalho->setDesconectado(1);
                $casaTrabalho->setAtivo(0);
                $casaTrabalho->salvar();
            }
        }
        $msg->setResultadoEtapa(true);
    }
}