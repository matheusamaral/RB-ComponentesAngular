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
            $msg->setResultadoEtapa(true, false, ['dados'=>$mensagens]);
        }else{
            $msg->setResultadoEtapa(false);
        }
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
            $cad = Conteiner::get('Cadastro')->cadastrar($msg);
            if($cad){
                $this->enviarVisualizada($msg, $mensagensId);
            }
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function enviarVisualizada($msg, $mensagensId){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        
        
        $paginas[] = 39 . '-' . $usuarioMensagemId . '-' . $usuarioId . '-' . $visibilidadeMensagensId . '-' . $visibilidadeUsuarioId;
        $paginas[] = 39 . '-' . $usuarioId . '-' . $usuarioMensagemId . '-' . $visibilidadeUsuarioId . '-' . $visibilidadeMensagensId;
        
        $cmd = Conteiner::get('Socket');
        
        $dados1 = $cmd->getConexao($usuarioId, $paginas[0]);
        $dados2 = $cmd->getConexao($usuarioId, $paginas[1]);
        
        for($i = 0; $i < count($dados1['toConexao']); $i++){    
            $mensagem[$i]['to'] = $dados1['toConexao'][$i];
            $mensagem[$i]['from'] = $dados1['fromConexao'];
            $mensagem[$i]['remetente'] = $dados1['remetente'][$i];
            $mensagem[$i]['usuarioId'] = $dados1['usuarios'][$i];
            if(is_array($mensagensId)){
                $mensagem[$i]['mensagemId'] = $mensagensId;
            }else{
                $mensagem[$i]['mensagemId'] = [$mensagensId];
            }
            $mensagem[$i]['visualizada'] = 1;
            
            if($mensagem[$i]['remetente'] != 1){
                $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
            }
        }
        
        for($i = 0; $i < count($dados2['toConexao']); $i++){
            
            $mensagem2[$i]['to'] = $dados2['toConexao'][$i];
            $mensagem2[$i]['from'] = $dados2['fromConexao'];
            $mensagem2[$i]['remetente'] = $dados2['remetente'][$i];
            $mensagem2[$i]['usuarioId'] = $dados2['usuarios'][$i];
            if(is_array($mensagensId)){
                $mensagem[$i]['mensagemId'] = $mensagensId;
            }else{
                $mensagem[$i]['mensagemId'] = [$mensagensId];
            }
            $mensagem2[$i]['visualizada'] = 1;
            if($mensagem[$i]['remetente'] != 1){
                $cmd->enviarMensagem($mensagem2[$i], $mensagem2[$i]['to']);
            }
        }
        $msg->setResultadoEtapa(true);
    }
}
