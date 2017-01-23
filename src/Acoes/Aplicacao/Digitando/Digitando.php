<?php
namespace Quickpeek\Acoes\Aplicacao\Digitando;
use Rubeus\ContenerDependencia\Conteiner;

class Digitando {
    
    public function digitando($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
        $perguntaId = $msg->getCampo('PerguntaId')->get('valor');
        $agrupamento = $msg->getCampo('Agrupamento')->get('valor');
        
        $cmd = Conteiner::get('Socket');
        if($perguntaId){
            $pagina = '34' . '-' . $perguntaId;
        }elseif($agrupamento){
            $pagina = '37' . '-' . $agrupamento;
        }
        
        $dados = $cmd->getConexao($usuarioId, $pagina);
        
        if($dados['usuarios']){
            foreach($dados['usuarios'] as $v){
                $dadosUsuario[] = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidade($usuarioId, $visibilidadeId, $v);
            }
            
            for($i = 0; $i < count($dados['toConexao']); $i++){
                $mensagem[$i]['to'] = $dados['toConexao'][$i];
                $mensagem[$i]['from'] = $dados['fromConexao'];
                $mensagem[$i]['pagina'] = $dados['paginas'][$i];
                $mensagem[$i]['digitando'] = 1;
                $mensagem[$i]['usuarioId'] = $dadosUsuario[$i]['usuarioId'];
                $mensagem[$i]['endereco'] = $dadosUsuario[$i]['usuarioEndereco'];
                
                $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
            }
        }
        $msg->setResultadoEtapa(true);
    }
}