<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class Respostas {
    
    public function respostas($msg){
        
        $cadastro = Conteiner::get('Cadastro');
        $msg->setCampo('entidade', 'Respostas');
        $msg->setCampo('Respostas::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        $suc = $cadastro->cadastrar($msg);
        
        if($suc){
            $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
            $msg->setCampo('entidade', 'Perguntas');
            $msg->setCampo('Perguntas::id', $perguntaId);
            $msg->setCampo('Perguntas::respondida', 1);
            $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
