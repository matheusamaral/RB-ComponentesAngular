<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class SetarMensagensVisualizadas {
    
    public function setarMensagensVisualizadas($msg){
        
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
}