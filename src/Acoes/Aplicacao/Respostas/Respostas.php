<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class Respostas {
    
    public function respostas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        
        $query = Conteiner::get('ConsultaCheckIn')->consultar($perguntaId, $usuarioId);
        
        if($query){
            $msg->setCampo('Respostas::checkIn', 1);
        }else{
            $msg->setCampo('Respostas::checkIn', 0);
        }
        
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
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
            $suc = $cadastro->cadastrar($msg);
        }
        
        if($suc){
            $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
            $usuarioAcaoId = Conteiner::get('ConsultaUsuarioPergunta')->consultar($perguntaId);
            
            if($usuarioAcaoId != $usuarioId){
                $respostaId = $msg->getCampo('Respostas::id')->get('valor');
                $msg->setCampo('entidade', 'Notificacoes');
                $msg->setCampo('Notificacoes::respostaId', $respostaId);
                $msg->setCampo('Notificacoes::usuarioId', $usuarioId);
                $msg->setCampo('Notificacoes::usuarioAcaoId', $usuarioAcaoId);
                $msg->setCampo('Notificacoes::tipo', 2);
                $cadastro->cadastrar($msg);
                
                $msg->setCampo('entidade', 'Perguntas');
                $msg->setCampo('Perguntas::id', $perguntaId);
                $msg->setCampo('Perguntas::respondida', 1);
                $cadastro->cadastrar($msg);
            }
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
