<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ExcluirMensagem {
    
    public function excluirMensagem($msg){
        
        $mensagens = $msg->getCampo('MensagensExcluidas::mensagensId')->get('valor');
        
        foreach($mensagens as $v){
            $usuarioId[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
        }
        
        $msg->setCampo('entidade', 'MensagensExcluidas');
        $msg->setCampo('MensagensExcluidas::usuarioId', $usuarioId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
