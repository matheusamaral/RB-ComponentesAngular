<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class ExcluirPerguntas {
    
    public function excluirPerguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Perguntas::id')->get('valor');
        
        $msg->setCampo('entidade', 'PerguntaExcluida');
        $msg->setCampo('PerguntaExcluida::usuarioId', $usuarioId);
        $msg->setCampo('PerguntaExcluida::perguntasId', $perguntaId);
        $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        if($cad){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}