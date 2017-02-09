<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class VerificarPosicao {
    
    public function verificarPosicao($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $query = Conteiner::get('DistanciaLocalCheckIn');
        $id = $query->consultar($usuarioId, $latitude, $longitude);
        if($id){
            $entidade = ConteinerEntidade::getInstancia('CheckIn');
            $entidade->setId($id);
            $entidade->setPresente(0);
            $entidade->salvar();
        }
        $casaTrabalho = $query->consultarCasaTrabalho($usuarioId, $latitude, $longitude);
        if($casaTrabalho){
            $this->cancelarCasaTrabalho($casaTrabalho);
        }
        $msg->setResultadoEtapa(true);
    }
    
    private function cancelarCasaTrabalho($casaTrabalho){
        
        $entidade = ConteinerEntidade::getInstancia('CasaTrabalho');
        
        $entidade->setId($casaTrabalho['id']);
        if(($casaTrabalho['casa'] == 1 && $casaTrabalho['distanciaCasa'] > 0.03) || ($casaTrabalho['trabalho'] == 1 && $casaTrabalho['distanciaTrabalho'] > 0.03)){
            $entidade->deletar(0);
        }
    }
}
