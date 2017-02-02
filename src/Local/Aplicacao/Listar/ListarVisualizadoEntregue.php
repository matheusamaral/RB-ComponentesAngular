<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarVisualizadoEntregue {
    
    public function listarVisualizadoEntregue($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Perguntas::id')->get('valor');
        
        $query = Conteiner::get('ConsultaListarVisualizadoEntregue');
        
        $entregue = $query->consultarEntregue($usuarioId, $perguntaId);
        $alertaEntregue = $query->consultarAlertaEntregue($perguntaId);
        $visualizado = $query->consultarVisualizado($usuarioId, $perguntaId);
        $dados[0]['entregue'] = $entregue;
        $dados[0]['restantes'] = $alertaEntregue - count($entregue);
        $dados[1]['visualizado'] = $visualizado;
        $dados[1]['restantes'] = count($entregue) - count($visualizado);
        
        if($dados){
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}