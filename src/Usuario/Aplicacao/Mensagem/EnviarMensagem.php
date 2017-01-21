<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class EnviarMensagem {
    
    public function enviarMensagem($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        
        $bloqueoou = Conteiner::get('ConsultaBloqueado')->consultar($usuarioId, $usuarioMensagemId, $visibilidadeUsuarioId);
        
        if(!$bloqueoou){
            $bloqueado = Conteiner::get('ConsultaBloqueado')->consultar($usuarioMensagemId, $usuarioId, $visibilidadeMensagensId);
            if($bloqueado){
                $msg->setCampo('Mensagens::statusMensagemId', 4);
            }
            $cadastro = Conteiner::get('Cadastro');
            $msg->setCampo('entidade', 'Mensagens');
            $msg->setCampo('Mensagens::usuarioId', $usuarioId);
            $cad = $cadastro->cadastrar($msg);
            if($cad){
                $this->conexaoSocket($msg);
                $msg->setResultadoEtapa(true);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }else{
            $msg->setResultadoEtapa(false, false, ['bloqueoou'=>1]);
        }
    }
    
    private function conexaoSocket($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        
        $mensagemId = $msg->getCampo('Mensagens::id')->get('valor');
        $mensagem = $msg->getCampo('Mensagens::titulo')->get('valor');
        $mensagemEndereco = $msg->getCampo('Mensagens::endereco')->get('valor');
        $agrupamento = $usuarioId . "-" . $usuarioMensagemId . "-" . $visibilidadeId . "-" . $visibilidadeUsuarioId;
        $dadosUsuario = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidade($usuarioId, $visibilidadeId);

        $dados['mensagemId'] = $mensagemId;
        $dados['mensagem'] = $mensagem;
        $dados['mensagemEndereco'] = $mensagemEndereco;
        $dados['mensagemStatus'] = 1;
        $dados['mensagemMomento'] = date('Y-m-d H:i:s');
        $dados['agrupamento'] = $agrupamento;
        $dados['from'] = $usuarioId;
        $dados['usuarioNome'] = $dadosUsuario['usuarioNome'];
        $dados['usuarioEndereco'] = $dadosUsuario['usuarioEndereco'];
        $dados['to'] = [$usuarioMensagemId];
    }
}