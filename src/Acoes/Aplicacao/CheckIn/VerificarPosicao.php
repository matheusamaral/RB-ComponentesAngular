<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class VerificarPosicao {
    
    public function verificarPosicao($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $latitude = $msg->getCampo('Latitude')->get('valor');
        $longitude = $msg->getCampo('Longitude')->get('valor');
        
        $id = Conteiner::get('DistanciaLocalCheckIn')->consultar($usuarioId, $latitude, $longitude);
        if($id){
            $entidade = ConteinerEntidade::getInstancia('CheckIn');
            $entidade->setId($id);
            $entidade->setPresente(0);
            $entidade->salvar();
        }
        $msg->setResultadoEtapa(true);
    }
}