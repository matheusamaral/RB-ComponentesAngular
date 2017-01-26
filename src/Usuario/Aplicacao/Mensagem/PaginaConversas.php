<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class PaginaConversas {
    
    public function paginaConversas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $notIn = $this->atualizando($msg);
        
        $query = Conteiner::get('ConsultaPaginaConversas')->consultar($usuarioId, $notIn);
        
        if($query){
            foreach($query as $v){
                $conversasNotIn[] = $v['agrupamento'];
            }
            if($notIn){
                $conversasNotIn = array_merge($msg->getCampoSessao('conversasNotIn'), $conversasNotIn);
            }
            $msg->setCampoSessao('conversasNotIn', $conversasNotIn);
            
            $this->setarMensagensVisualizadas($msg);
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function setarMensagensVisualizadas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $id = Conteiner::get('ConsultaSetarMensagensVisualizadas')->consultar($usuarioId);
        
        if($id){
            foreach($id as $v){
                $visualizado[] = 1;
            }
            $msg->setCampo('entidade', 'Mensagens');
            $msg->setCampo('Mensagens::id', $id);
            $msg->setCampo('Mensagens::visualizado', $visualizado);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $conversasNotIn = $msg->getCampoSessao('conversasNotIn');
            foreach($conversasNotIn as $v){
                $conversaNotIn[] = "'" . $v . "'";
            }
            $notIn = implode(', ', $conversaNotIn);
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
}