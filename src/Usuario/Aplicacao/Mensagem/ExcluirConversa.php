<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ExcluirConversa {
    
    public function excluirConversa($msg){
        
        $usuarioMensagemId = $msg->getCampo('Usuario::id')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('VisibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('VisibilidadeUsuarioId')->get('valor');
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $mensagensId = Conteiner::get('ConsultaExcluirConversa')->consultar($usuarioId, $usuarioMensagemId, 
                $visibilidadeMensagensId, $visibilidadeUsuarioId);
        
        if($mensagensId){
            foreach($mensagensId as $v){
                $usuariosId[] = $usuarioId;
            }
                    
            $msg->setCampo('entidade', 'MensagensExcluidas');
            $msg->setCampo('MensagensExcluidas::mensagensId', $mensagensId);
            $msg->setCampo('MensagensExcluidas::usuarioId', $usuariosId); 
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
