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
            if($arquivo){
                $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');
                if(!$caminho && $arquivo){
                    $erro = Conteiner::get('Upload')->getErro();
                    $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
                }else{
                    $msg->setCampo('Mensagens::endereco', $caminho[0]['url']);
                }
            }
            $cadastro = Conteiner::get('Cadastro');
            $msg->setCampo('Mensagens::usuarioId', $usuarioId);
            $msg->setCampo('entidade', 'Mensagens');
            $cad = $cadastro->cadastrar($msg);
            if($cad){
                $dados = $this->conexaoSocket($msg);
                $msg->setResultadoEtapa(true, false, $dados);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }else{
            $msg->setResultadoEtapa(false, 'bloqueado');
        }
    }
    
    private function conexaoSocket($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        
        $mensagemId = $msg->getCampo('Mensagens::id')->get('valor');
        $mensagem = $msg->getCampo('Mensagens::titulo')->get('valor');
        $mensagemEndereco = $msg->getCampo('Mensagens::endereco')->get('valor');
        $agrupamento = $usuarioId . "-" . $usuarioMensagemId . "-" . $visibilidadeId;
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
        
        return $dados;
    }
}