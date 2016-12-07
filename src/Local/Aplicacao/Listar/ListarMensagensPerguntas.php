<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarMensagensPerguntas {
    
    public function listarMensagensPerguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Perguntas::id')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $dados = Conteiner::get('ConsultaListarMensagensPerguntas')->consultar($usuarioId, $perguntaId, $tempo['respostas']);
        $pergunta = Conteiner::get('ConsultaListarMensagensPerguntas')->consultarPergunta($usuarioId, $perguntaId);
        
        if($pergunta){
            foreach($dados as $k=>$v){
                if($v['usuarioId'] == $usuarioId){
                    $dados[$k]['voce'] = 1;
                }else{
                    $dados[$k]['voce'] = 0;
                }
            }
            
            if($pergunta['usuarioId'] == $usuarioId){
                $pergunta['voce'] = 1;
            }else{
                $pergunta['voce'] = 0;
            }
            array_unshift($dados, $pergunta);
            
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
            $result = Conteiner::get('Cadastro')->cadastrar($msg);
            return $result;
        }else{
            return 0;
        }
    }
}