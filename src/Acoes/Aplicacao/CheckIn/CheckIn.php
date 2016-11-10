<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class CheckIn {
    
    public function checkIn($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $query = Conteiner::get('ConsultaExcluirCheckIn')->consultar($usuarioId);
        
        if($query){
            $entidade = ConteinerEntidade::getInstancia('CheckIn');
            $entidade->setId($query['id']);
            $entidade->setPresente(0);
            $entidade->salvar();
        }
        
        $msg->setCampo('entidade', 'CheckIn');
        $msg->setCampo('CheckIn::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        Conteiner::get('Cadastro')->cadastrar($msg);
        
        $local = Conteiner::get('ConsultaEncontrarLocal')->consultar($usuarioId);
        $msg->setCampoSessao('dadosUsuarioLogado,local', $local['localId']);
        $msg->setResultadoEtapa(true);
    }
}
