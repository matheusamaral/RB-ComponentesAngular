<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarNaoVisualizadas {
    
    public function listarNaoVisualizadas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $mensagens = Conteiner::get('ConsultaListarNaoVisualizadas')->consultar($usuarioId);
        $notificacoes = Conteiner::get('ConsultaListarNaoVisualizadas')->consultarNotificacoes($usuarioId);
        
        $dados['mensagens'] = $mensagens;
        $dados['notificacoes'] = $notificacoes;
        
        if($dados){
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}