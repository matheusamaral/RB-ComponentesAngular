<?php
namespace Quickpeek\Acoes\Aplicacao\Digitando;
use Rubeus\ContenerDependencia\Conteiner;

class Digitando {
    
    public function digitando($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
        $perguntaId = $msg->getCampo('PerguntaId')->get('valor');
        $agrupamento = $msg->getCampo('Agrupamento')->get('valor');
        
        $dadosBanco = Conteiner::get('DadosBanco');
        
        if($perguntaId){
            $pagina = '34' . '-' . $perguntaId;
        }elseif($agrupamento){
            $pagina = '40' . '-' . $agrupamento;
        }
        
        for($i = 0; $i < count($dadosBanco); $i++){
            if($dadosBanco[$i]['usuario'] == $usuarioId){
                $fromConexao = $dadosBanco[$i]['conexao'];
            }
            foreach($dadosBanco[$i] as $k=>$v){
                if($k == 'pagina' && $v == $pagina){
                    $toConexao[] = $dadosBanco[$i]['conexao'];
                    $usuarios[] = $dadosBanco[$i]['usuario'];
                }
            }
        }
        
        if($usuarios){
            foreach($usuarios as $v){
                $dadosUsuario[] = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidade($usuarioId, $visibilidadeId, $v);
            }
            
            $cmd = Conteiner::get('Socket');
            for($i = 0; $i < count($toConexao); $i++){
                $mensagem[$i]['to'] = $toConexao[$i];
                $mensagem[$i]['from'] = $fromConexao;
                $mensagem[$i]['digitando'] = 1;
                $mensagem[$i]['usuarioId'] = $dadosUsuario[$i]['usuarioId'];
                $mensagem[$i]['endereco'] = $dadosUsuario[$i]['usuarioEndereco'];

                $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
            }
        }
        if($fromConexao){
            $msg->setResultadoEtapa(true);
        }
    }
}