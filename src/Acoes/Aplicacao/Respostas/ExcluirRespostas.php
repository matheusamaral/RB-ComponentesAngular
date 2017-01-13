<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class ExcluirRespostas {
    
    public function excluirRespostas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $respostasId = $msg->getCampo('Respostas::id')->get('valor');
        
        foreach($respostasId as $v){
            $usuarios[] = $usuarioId;
        }
        
        $msg->setCampo('entidade', 'PerguntaExcluida');
        $msg->setCampo('PerguntaExcluida::usuarioId', $usuarios);
        $msg->setCampo('PerguntaExcluida::respostasId', $respostasId);
        $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        if($cad){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}