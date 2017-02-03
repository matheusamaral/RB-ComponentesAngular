<?php
namespace Quickpeek\Acoes\Aplicacao\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class AlterarVisibilidade {
    
    public function alterarVisibilidade($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $checkIn = Conteiner::get('ConsultaCheckIn')->consultar($usuarioId);
        
        if($checkIn['automatico'] == 1 && $checkIn['confirmado'] == 0){
            $msg->setCampo('CheckIn::confirmado', 1);
        }
        
        if($checkIn){
            $msg->setCampo('entidade', 'CheckIn');
            $msg->setCampo('CheckIn::id', $checkIn['id']);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}