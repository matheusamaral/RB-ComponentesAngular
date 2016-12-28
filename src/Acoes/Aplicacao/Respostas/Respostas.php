<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class Respostas {
    
    public function respostas($msg){
        
        $titulo = $msg->getCampo('Respostas::titulo')->get('valor');
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
        
        if(!(!$titulo && !$arquivo)){
            $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
            $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
            
            $bloqueado = $this->checarBloqueado($msg);
            
            if($bloqueado){
                $msg->setCampo('Respostas::bloqueado', 1);
            }
            $checkIn = Conteiner::get('ConsultaCheckIn')->consultar($usuarioId, $perguntaId);
            
            if($checkIn){
                $msg->setCampo('Respostas::checkIn', 1);
            }else{
                $msg->setCampo('Respostas::checkIn', 0);
            }

            $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');

            if(!$caminho && $arquivo){
                $erro = Conteiner::get('Upload')->getErro();
                $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
            }else{
                $cadastro = Conteiner::get('Cadastro');
                $msg->setCampo('entidade', 'Respostas');
                $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
                $msg->setCampo('Respostas::visibilidadeId', $visibilidadeId);
                $msg->setCampo('Respostas::endereco', $caminho[0]['url']);
                $msg->setCampo('Respostas::usuarioId', $usuarioId);
                $cad = $cadastro->cadastrar($msg);
            }
            if($cad){
                $this->enviarNotificacao($msg);
                $msg->setCampo('entidade', 'Perguntas');
                $msg->setCampo('Perguntas::id', $perguntaId);
                $msg->setCampo('Perguntas::respondida', 1);
                $cadastro->cadastrar($msg);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function checarBloqueado($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        
        $bloqueado = Conteiner::get('ConsultaBloqueado')->consultar($usuarioId, $perguntaId);
        if($bloqueado){
            $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
            if($bloqueado['visibilidadeId'] == 1 && ($visibilidadeId == 1 || 
                    ($visibilidadeId == 2 && $bloqueado['seguindo'])) || $bloqueado['visibilidadeId'] == 2
                    && ($visibilidadeId == 3 || ($visibilidadeId == 2 && !$bloqueado['seguindo']))){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    
    private function enviarNotificacao($msg){
        
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        $usuarioNotificacaoId = Conteiner::get('ConsultaUsuarioPergunta')->consultar($perguntaId);
        $cadastro = Conteiner::get('Cadastro');
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        if($usuarioNotificacaoId != $usuarioId){
            $respostaId = $msg->getCampo('Respostas::id')->get('valor');
            $msg->setCampo('entidade', 'Notificacoes');
            $msg->setCampo('Notificacoes::respostaId', $respostaId);
            $msg->setCampo('Notificacoes::usuarioId', $usuarioNotificacaoId);
            $msg->setCampo('Notificacoes::usuarioAcaoId', $usuarioId);
            $msg->setCampo('Notificacoes::tipoId', 3);
            $cadastro->cadastrar($msg);
        }
    }
}
