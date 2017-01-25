<?php
namespace Quickpeek\Acoes\Aplicacao\Digitando;
use Rubeus\ContenerDependencia\Conteiner;

class Digitando {
    
    public function digitando($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('PerguntaId')->get('valor');
        $agrupamento = $msg->getCampo('Agrupamento')->get('valor');
        $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultarRespostasVisibilidade($usuarioId, $perguntaId);
        
        $cmd = Conteiner::get('Socket');
        if($perguntaId){
            $pagina = 34 . '-' . $perguntaId;
        }elseif($agrupamento){
            $pagina = 39 . '-' . $agrupamento;
        }
        
        $dados = $cmd->getConexao($usuarioId, $pagina);
        
        if($dados['usuarios']){
            
            $dadosUsuario = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidadeMensagens($usuarioId, $visibilidadeId);
            
            for($i = 0; $i < count($dados['toConexao']); $i++){
                $mensagem[$i]['to'] = $dados['toConexao'][$i];
                $mensagem[$i]['from'] = $dados['fromConexao'];
                $mensagem[$i]['pagina'] = $dados['paginas'][$i];
                $mensagem[$i]['remetente'] = $dados['remetente'][$i];
                $mensagem[$i]['digitando'] = 1;
                $mensagem[$i]['usuarioId'] = $dadosUsuario['usuarioId'];
                $mensagem[$i]['usuarioNome'] = $dadosUsuario['usuarioNome'];
                $mensagem[$i]['endereco'] = $dadosUsuario['usuarioEndereco'];
                
                $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
            }
        }
        $msg->setResultadoEtapa(true);
    }
}