<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagens;
use Rubeus\ContenerDependencia\Conteiner;

class SetarMensagemVisualizada {
    
    public function setarMensagemVisualizada($msg){
   
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $mensagemId = $msg->getCampo('MensagensId')->get('valor');
        
        $cad = $this->setarVisualizada($msg);
        
        if($cad){
            $agrupamento = Conteiner::get('ConsultaAgrupamento')->consultar($mensagemId);
            $pagina = 39 . '-' . $agrupamento;
        
            $cmd = Conteiner::get('Socket');
            $dados = $cmd->getConexao($usuarioId, $pagina);
        
            if($dados){
                for($i = 0; $i < $dados['toConexao']; $i++){
                    $mensagem[$i]['to'] = $dados['toConexao'][$i];
                    $mensagem[$i]['from'] = $dados['from'];
                    $mensagem[$i]['remetente'] = $dados['remetente'][$i];
                    $mensagem[$i]['mensagemId'] = $mensagemId;
                    $mensagem[$i]['visualizada'] = 1;
                    
                    $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
                }
            }
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function setarVisualizada($msg){
        
        $msg->setCampo('entidade', 'Mensagens');
        $msg->setCampo('Mensagens::id', $msg->getCampo('MensagensId')->get('valor'));
        $msg->setCampo('Mensagens::statusMensagemId', 3);
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
}