<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarPerguntas {
    
    public function listarPerguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Local::id')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $query = Conteiner::get('ConsultaListarPerguntas')->consultar($localId, $usuarioId, 
                $tempo['perguntas'], $tempo['respostas']);
        
        if($query){
            foreach($query as $k=>$v){
                if($v['usuarioId'] == $usuarioId){
                    $query[$k]['voce'] = 1;
                }else{
                    $query[$k]['voce'] = 0;
                }
            }
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}