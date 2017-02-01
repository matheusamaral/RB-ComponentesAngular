<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class CheckIn {
    
    public function checkIn($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $consulta = Conteiner::get('ConsultaExcluirCheckIn');
        $checkIn = $consulta->consultar($usuarioId);
        $casaTrabalho = $consulta->consultarCasaTrabalho($usuarioId);
        
        if($checkIn){
            $entidade = ConteinerEntidade::getInstancia('CheckIn');
            $entidade->setId($checkIn);
            $entidade->setPresente(0);
            $entidade->salvar();
        }
        
        if($casaTrabalho){
            $entidade = ConteinerEntidade::getInstancia('CasaTrabalho');
            $entidade->setId($casaTrabalho);
            $entidade->setCasa(0);
            $entidade->setTrabalho(0);
            $entidade->salvar();
        }
        
        $sugestaoCheckIn = $msg->getCampoSessao('sugestaoCheckIn');
        if($sugestaoCheckIn){
            $msg->setCampo('CheckIn::id', $sugestaoCheckIn);
            $msg->setCampo('CheckIn::momento', $msg->getCampoSessao('sugestaoCheckInMomento'));
            $msg->setCampo('CheckIn::presente', 1);
            $msg->setCampo('CheckIn::confirmado', 1);
        }
        
        $msg->setCampo('entidade', 'CheckIn');
        $msg->setCampo('CheckIn::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        
        if($cad){
            $msg->setCampoSessao('dadosUsuarioLogado,local', $msg->getCampo('CheckIn::localId')->get('valor'));
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
