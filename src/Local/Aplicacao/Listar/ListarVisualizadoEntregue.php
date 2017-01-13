<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarVisualizadoEntregue {
    
    public function listarVisualizadoEntregue($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Perguntas::id')->get('valor');
        
        $query = Conteiner::get('ConsultaListarVisualizadoEntregue');
        
        $entregue = $query->consultarEntregue($usuarioId, $perguntaId);
        $visualizado = $query->consultarVisualizado($usuarioId, $perguntaId);
        
        $dados['entregue'] = $entregue;
        $dados['visualizado'] = $visualizado;
        
        if($dados['entregue'] && $dados['visualizado']){
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}