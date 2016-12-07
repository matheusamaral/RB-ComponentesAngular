<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarPessoas {
    
    public function listarPessoas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Local::id')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        
        $query = Conteiner::get('ConsultaPessoa')->consultar($usuarioId, $localId, 
                $tempo['midia'], $tempo['hashtag'], 1000);
        
        if($query){
            foreach($query as $k=>$v){
                if($v['usuarioId'] == $usuarioId){
                    $query[$k]['cor'] = 1;
                }else{
                    $query[$k]['cor'] = 0;
                }
            }
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
