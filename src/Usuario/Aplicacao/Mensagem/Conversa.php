<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class Conversa {
    
    public function conversa($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        $mensagensNotIn = $msg->getCampoSessao('mensagensId');
        
        if($atualizando){
            $notIn = implode(', ', $mensagensNotIn);
        }else{
            $notIn = 0;
        }
        
        $mensagens = Conteiner::get('ConsultaConversa')->consultar($usuarioId, $usuarioMensagemId, $visibilidadeMensagensId, $visibilidadeUsuarioId, $notIn);
        
        if($mensagens){
            foreach($mensagens as $v){
                $mensagensId[] = $v['id'];
            }
            if($atualizando){
                $mensagensId = array_merge($mensagensNotIn, $mensagensId);
            }
            $msg->setCampoSessao('mensagensId', $mensagensId);
        }
        
        if($mensagens){
            $this->setarVisualizada($msg);
            $dados['online'] = $this->verificarOnline($msg);
            $dados['mensagens'] = $mensagens;
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function verificarOnline($msg){
        
        $usuarioConversaId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $dadosBanco = Conteiner::get('DadosBanco');
        
        foreach($dadosBanco as $v){
            if($v['usuario'] == $usuarioConversaId){
                return 1;
            }
        }
        return 0;
    }
    
    private function setarVisualizada($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        
        $mensagensId = Conteiner::get('ConsultaSetarVisualizada')->consultar($usuarioId, $usuarioMensagemId, 
                $visibilidadeMensagensId, $visibilidadeUsuarioId);
        
        if($mensagensId){
            foreach($mensagensId as $v){
                $status[] = 3;
                $momento[] = date('Y-m-d H:i:s');
            }
            $msg->setCampo('entidade', 'Mensagens');
            $msg->setCampo('Mensagens::id', $mensagensId);
            $msg->setCampo('Mensagens::statusMensagemId', $status);
            $msg->setCampo('Mensagens::momentoVisualizado', $momento);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
