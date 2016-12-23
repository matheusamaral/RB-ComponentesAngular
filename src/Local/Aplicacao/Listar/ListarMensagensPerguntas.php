<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarMensagensPerguntas {
    
    public function listarMensagensPerguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Perguntas::id')->get('valor');
        
        $notIn = $this->atualizando($msg);
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $dados = Conteiner::get('ConsultaListarMensagensPerguntas')->consultar($usuarioId, $perguntaId, 
                $tempo['respostas'], $notIn);
        $pergunta = Conteiner::get('ConsultaListarMensagensPerguntas')->consultarPergunta($usuarioId, $perguntaId);
        
        if($pergunta){
            if($dados){
                foreach($dados as $v){
                    $respostasId[] = $v['respostaId'];
                }
                $this->visualizarRespostas($msg, $perguntaId, $tempo['respostas']);
                
                if($notIn){
                    $respostasId = array_merge($msg->getCampoSessao('respostasNotIn'), $respostasId);
                }
                $msg->setCampoSessao('respostasNotIn', $respostasId);
                array_unshift($dados, $pergunta);
            }else{
                $dados = $pergunta;
            }
            
            $this->setarPerguntaVisualizada($msg);
            
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
        
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $msg->getCampoSessao('respostasNotIn'));
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
    
    private function visualizarRespostas($msg, $perguntaId, $tempo){
        
        $usuarioIdSessao = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $respostaId = Conteiner::get('ConsultaListarMensagensPerguntas')->consultaRespostasId($perguntaId, $tempo);
        $respostasId = '';
        $usuarioId = '';
        
        foreach($respostaId as $v){        
            $id = Conteiner::get('ConsultaVisualizarRespostas')->consultar($usuarioIdSessao, $v);
            if(!$id){
                $usuarioId[] = $usuarioIdSessao;
                $respostasId[] = $v;
            }
        }
        
        if($respostasId && $usuarioId){
            $msg->setCampo('entidade', 'RespostasVisualizadas');
            $msg->setCampo('RespostasVisualizadas::usuarioId', $usuarioId);
            $msg->setCampo('RespostasVisualizadas::respostasId', $respostasId);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
    
    private function setarPerguntaVisualizada($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Perguntas::id')->get('valor');
        
        $id = Conteiner::get('ConsultaPerguntaUsuario')->consultar($usuarioId, $perguntaId);
        
        if($id){
            $msg->setCampo('entidade', 'PerguntaUsuario');
            $msg->setCampo('PerguntaUsuario::id', $id);
            $msg->setCampo('PerguntaUsuario::visualizado', 1);
            $msg->setCampo('PerguntaUsuario::momentoVisualizado', date('Y-m-d H:i:s'));
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}