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
        
//        for($i = 0; $i < count($dadosBanco); $i++){
//            if($dadosBanco[$i]['usuario'] == $usuarioId){
//                $fromConexao = $dadosBanco[$i]['conexao'];
//            }
//            foreach($dadosBanco[$i] as $k=>$v){
//                if($k == 'pagina' && $v == $pagina){
//                    $toConexao[] = $dadosBanco[$i]['conexao'];
//                    $usuarios[] = $dadosBanco[$i]['usuario'];
//                    $paginas[] = $pagina;
//                }
//            }
//        }
        
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