<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ExcluirConversa {
    
    public function excluirConversa($msg){
        
        $usuarioMensagemId = $msg->getCampo('Usuario::id')->get('valor');
        $sessaoId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $query = Conteiner::get('ConsultaExcluirConversa')->consultar($sessaoId, $usuarioMensagemId);
        $msg->setCampo('entidade', 'MensagensExcluidas');
        
        foreach($query as $v){
            $usuarioId[] = $sessaoId;
            $mensagensId[] = $v['id'];
        }               
        $msg->setCampo('MensagensExcluidas::mensagensId', $mensagensId);
        $msg->setCampo('MensagensExcluidas::usuarioId', $usuarioId); 
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
