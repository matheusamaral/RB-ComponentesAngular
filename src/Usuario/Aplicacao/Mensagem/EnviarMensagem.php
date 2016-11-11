<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class EnviarMensagem {
    
    public function enviarMensagem($msg){
        
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
        $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');
        
        if(!$caminho && $arquivo){
            $erro = Conteiner::get('Upload')->getErro();
            $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
        }else{
            $cadastro = Conteiner::get('Cadastro');
            $msg->setCampo('Mensagens::endereco', $caminho[0]['url']);
        }
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $msg->setCampo('Mensagens::usuarioId', $usuarioId);
        $msg->setCampo('entidade', 'Mensagens');
        $cadastro->cadastrar($msg);
    }
}