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
}
