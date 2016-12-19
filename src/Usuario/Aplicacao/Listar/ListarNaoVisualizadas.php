<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarNaoVisualizadas {
    
    public function listarNaoVisualizadas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $mensagens = Conteiner::get('ConsultaListarNaoVisualizadas')->consultar($usuarioId);
        $notificacoes = Conteiner::get('ConsultaListarNaoVisualizadas')->consultarNotificacoes($usuarioId);
        
        if($mensagens){
            $dados['mensagens'] = count($mensagens);
        }else{
            $dados['mensagens'] = 0;
        }
        
        if($notificacoes){
            $dados['notificacoes'] = count($notificacoes);
        }else{
            $dados['notificacoes'] = 0;
        }
        
        if($dados){
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}