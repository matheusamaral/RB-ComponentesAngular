<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class SetarVisibilidadeResposta {
    
    public function setarVisibilidadeResposta($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntasId = $msg->getCampo('RespostasVisibilidade::perguntasId')->get('valor');
        
        $id = Conteiner::get('ConsultaRespostasVisibilidade')->consultar($usuarioId, $perguntasId);
        
        if($id){
            $msg->setCampo('RespostasVisibilidade::id', $id);
        }
        $msg->setCampo('entidade', 'RespostasVisibilidade');
        $msg->setCampo('RespostasVisibilidade::usuarioId', $usuarioId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}