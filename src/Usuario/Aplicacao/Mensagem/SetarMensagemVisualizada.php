<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class SetarMensagemVisualizada {
    
    public function setarMensagemVisualizada($msg){
   
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $mensagemId = $msg->getCampo('MensagemId')->get('valor');
        
        $cad = $this->setarVisualizada($msg);
        
        if($cad){
            $agrupamento = Conteiner::get('ConsultaAgrupamento')->consultar($mensagemId);
            $pagina = 39 . '-' . $agrupamento;
            
            $cmd = Conteiner::get('Socket');
            $dados = $cmd->getConexao($usuarioId, $pagina);
            
            if($dados){
                $mensagem['to'] = $dados['toConexao'][0];
                $mensagem['from'] = $dados['fromConexao'];
                $mensagem['remetente'] = $dados['remetente'][0];
                $mensagem['usuarioId'] = $dados['usuarios'][0];
                $mensagem['mensagemId'] = [$mensagemId];
                $mensagem['visualizada'] = 1;

                $cmd->enviarMensagem($mensagem, $mensagem['to']);
            }
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function setarVisualizada($msg){
        
        $msg->setCampo('entidade', 'Mensagens');
        $msg->setCampo('Mensagens::id', $msg->getCampo('MensagemId')->get('valor'));
        $msg->setCampo('Mensagens::statusMensagemId', 3);
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
}