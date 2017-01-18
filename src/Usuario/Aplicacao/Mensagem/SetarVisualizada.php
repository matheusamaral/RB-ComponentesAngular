<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class SetarVisualizada {
    
    public function setarVisualizada($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('UsuarioMensagemId')->get('valor');
        $visibilidadeMensagemId = $msg->getCampo('VisibilidadeMensagemId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('VisibilidadeUsuarioId')->get('valor');
        
        $query = Conteiner::get('ConsultaSetarVisualizada')->consultar($usuarioId, $usuarioMensagemId, $visibilidadeMensagemId, $visibilidadeUsuarioId);
        
        if($query){
            foreach($query as $v){
                $momento[] = date('Y-m-d H:i:s');
                $msgId[] = $v['id'];
                $status[] = 3;
            }
            $msg->setCampo('entidade', 'Mensagens');
            $msg->setCampo('Mensagens::id', $msgId);
            $msg->setCampo('Mensagens::momentoVisualizado', $momento);
            $msg->setCampo('Mensagens::statusMensagemId', $status);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
