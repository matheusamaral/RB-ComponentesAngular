<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class SetarEntregue {
    
    public function setarEntregue($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $query = Conteiner::get('ConsultaSetarEntregue')->consultar($usuarioId);
        
        if($query){
            foreach($query as $v){
                $paginas[] = 39 . '-' . $v['agrupamento'];
                $mensagensId[] = $v['id'];
            }
            
            $cad = $this->cadastrar($msg, $mensagensId);
            if($cad){
                $this->conexaoSocket($msg, $paginas, $mensagensId);
                $msg->setResultadoEtapa(true);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function conexaoSocket($msg, $paginas, $mensagensId){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $cmd = Conteiner::get('Socket');
        foreach($paginas as $k=>$v){
            $dados[] = $cmd->getConexao($usuarioId, $v);
        }
        
        foreach($dados as $k=>$v){
            if($v){
                for($i = 0; $i < count($v['toConexao']); $i++){
                    $mensagem[$i]['to'] = $v['toConexao'][$i];
                    $mensagem[$i]['from'] = $v['fromConexao'];
                    $mensagem[$i]['remetente'] = $v['remetente'][$i];
                    $mensagem[$i]['usuarioId'] = $v['usuarios'][$i];
                    $mensagem[$i]['mensagemId'] = $mensagensId[$k];
                    $mensagem[$i]['entregue'] = 1;
                    
                    $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
                }
            }
        }
    }
    
    private function cadastrar($msg, $mensagensId){
        
        for($i = 0; $i < count($mensagensId); $i++){
            $status[] = 2;
        }
        
        $msg->setCampo('entidade', 'Mensagens');
        $msg->setCampo('Mensagens::id', $mensagensId);
        $msg->setCampo('Mensagens::statusMensagemId', $status);
        return Conteiner::get('Cadastro')->cadastrar($msg);
    }
}