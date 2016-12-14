<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class AlterarVisibilidade {
    
    public function alterarVisibilidade($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampoSessao('dadosUsuarioLogado,local');
        
        $checkInId = Conteiner::get('ConsultaAlterarVisibilidade')->consultar($usuarioId, $localId);
        if($checkInId){
            $msg->setCampo('entidade', 'CheckIn');
            $msg->setCampo('CheckIn::id', $checkInId);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}