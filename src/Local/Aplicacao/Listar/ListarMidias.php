<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarMidias {
    
    public function listarMidias($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Local::id')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $query = Conteiner::get('ConsultaListarMidias');
        $midias = $query->consultar($localId, $tempo['midia']);
        
        if($midias){
            foreach($midias as $v){
                $curtidas[] = $query->consultarCurtidas($usuarioId, $v['id']);
            }
            foreach($curtidas as $k=>$value){
                if($value){
                    foreach($value as $v){
                        if($v['usuarioId'] == $usuarioId){
                            $midias[$k]['jaCurtiu'] = 1;
                        }
                    }
                }
                if(!array_key_exists('jaCurtiu', $midias[$k])){
                    $midias[$k]['jaCurtiu'] = 0;
                }
                $midias[$k]['curtidas'] = $value;
            }
            $msg->setResultadoEtapa(true, false, ['dados'=>$midias]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
