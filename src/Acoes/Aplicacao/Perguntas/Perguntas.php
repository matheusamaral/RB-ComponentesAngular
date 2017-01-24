<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class Perguntas {
    
    public function perguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $cadastro = Conteiner::get('Cadastro');

        $msg->setCampo('entidade', 'Perguntas');
        $msg->setCampo('Perguntas::usuarioId', $usuarioId);
        $cad = $cadastro->cadastrar($msg);
        if($cad){
            $this->conexaoSocket($msg);
            $msg->setResultadoEtapa(true, false, ['resposta'=>1]);
        }
    }
    
    private function conexaoSocket($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $visibilidadeId = $msg->getCampo('Perguntas::visibilidadeId')->get('valor');
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        
        $cmd = Conteiner::get('Socket');
        $pagina = '27' . '-' . $localId;
        
        $dados = $cmd->getConexao($usuarioId, $pagina);
        
        if($dados['usuarios']){
            foreach($dados['usuarios'] as $v){
                $dadosUsuario[] = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidade($usuarioId, $visibilidadeId, $v);
            }
            
            for($i = 0; $i < count($dados['toConexao']); $i++){
                $mensagem[$i]['to'] = $dados['toConexao'][$i];
                $mensagem[$i]['from'] = $dados['fromConexao'];
                $mensagem[$i]['pagina'] = $dados['paginas'][$i];
                $mensagem[$i]['pergunta'] = 1;
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