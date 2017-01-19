<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class Conversa {
    
    public function conversa($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        $mensagensNotIn = $msg->getCampoSessao('mensagensId');
        
        if($atualizando){
            $notIn = implode(', ', $mensagensNotIn);
        }else{
            $notIn = 0;
        }
        
        $query = Conteiner::get('ConsultaConversa')->consultar($usuarioId, $usuarioMensagemId, $visibilidadeMensagensId, $notIn);
        
        if($query){
            foreach($query as $v){
                $mensagensId[] = $v['id'];
            }
            if($atualizando){
                $mensagensId = array_merge($mensagensNotIn, $mensagensId);
            }
            $msg->setCampoSessao('mensagensId', $mensagensId);
        }
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
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
