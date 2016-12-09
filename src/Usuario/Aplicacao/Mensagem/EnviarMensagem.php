<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class EnviarMensagem {
    
    public function enviarMensagem($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        
        $bloqueoou = Conteiner::get('ConsultaBloqueado')->consultar($usuarioMensagemId, $usuarioId, $visibilidadeId);
        
        if(!$bloqueoou){
            $bloqueado = Conteiner::get('ConsultaBloqueado')->consultar($usuarioId, $usuarioMensagemId, $visibilidadeId);
            if($bloqueado){
                $msg->setCampo('Mensagens::statusMensagemId', 4);
            }

            $arquivo = $msg->getCampo('Arquivo')->get('valor');
            $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');

            if(!$caminho && $arquivo){
                $erro = Conteiner::get('Upload')->getErro();
                $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
            }else{
                $cadastro = Conteiner::get('Cadastro');
                $msg->setCampo('Mensagens::endereco', $caminho[0]['url']);
            }

            $msg->setCampo('Mensagens::usuarioId', $usuarioId);
            $msg->setCampo('entidade', 'Mensagens');
            $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false, 'bloqueado');
        }
    }
}