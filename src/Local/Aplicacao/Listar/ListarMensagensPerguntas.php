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
    
    private function atualizando($msg){
        
        $atualizando = $msg->getCampo('Atualizando')->get('valor');
        
        if($atualizando){
            $notIn = implode(', ', $msg->getCampoSessao('respostasNotIn'));
        }else{
            $notIn = 0;
        }
        return $notIn;
    }
}