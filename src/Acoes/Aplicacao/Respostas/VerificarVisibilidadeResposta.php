<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class VerificarVisibilidadeResposta {
    
    public function verificarVisibilidadeResposta($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntasId = $msg->getCampo('PerguntasId')->get('valor');
        
        $id = Conteiner::get('ConsultaRespostasVisibilidade')->consultar($usuarioId, $perguntasId);
        
        if($id){
            $msg->setResultadoEtapa(true, false, ['dados'=>1]);
        }else{
            $msg->setResultadoEtapa(true, false, ['dados'=>0]);
        }
    }
}