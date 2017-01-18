<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class Perguntas {
    
    public function perguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $cadastro = Conteiner::get('Cadastro');

        $msg->setCampo('entidade', 'Perguntas');

        if(!$msg->getCampo('Perguntas::visibilidadeId')->get('valor')){
            $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
            $msg->setCampo('Perguntas::visibilidadeId', $visibilidadeId);
        }

        $msg->setCampo('Perguntas::usuarioId', $usuarioId);
        $cad = $cadastro->cadastrar($msg);
        if($cad){
            $this->conexaoSocket($msg);
        }
    }
    
    private function conexaoSocket($msg){
        
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        $visibilidadeId = $msg->getCampo('Perguntas::visibilidadeId')->get('valor');
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $dadosBanco = Conteiner::get('DadosBanco');
        $pagina = '27' . '-' . $localId;

        for($i = 0; $i < count($dadosBanco); $i++){
            var_dump($usuarioId);
            var_dump($dadosBanco[$i]);
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
                $mensagem[$i]['id'] = $msg->getCampo('Perguntas::id')->get('valor');
                $mensagem[$i]['titulo'] = $msg->getCampo('Perguntas::titulo')->get('valor');
                $mensagem[$i]['usuarioId'] = $dadosUsuario[$i]['usuarioId'];
                $mensagem[$i]['respostas'] = 0;
                $mensagem[$i]['endereco'] = $dadosUsuario[$i]['usuarioEndereco'];
                $mensagem[$i]['nome'] = $dadosUsuario[$i]['usuarioNome'];
                $mensagem[$i]['momento'] = date('Y-m-d H:i:s');

                $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
            }
        }
    }
}