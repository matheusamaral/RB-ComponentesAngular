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
            $this->enviarAlerta($msg);
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
                $mensagem[$i]['remetente'] = $dados['remetente'][$i];
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
        $msg->setResultadoEtapa(true, false, ['remetente'=>1]);
    }
    
    private function enviarAlerta($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntasId = $msg->getCampo('Perguntas::id')->get('valor');
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        $visibilidadeId = $msg->getCampo('Perguntas::visibilidadeId')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $pessoas = Conteiner::get('PessoasAlerta')->consultar($usuarioId, $localId, $tempo['hashtag'], $tempo['midia']);
        
        if($pessoas){
            foreach($pessoas as $v){
                $dadosUsuario = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidade($usuarioId, $visibilidadeId, $v['usuarioId']);
                $contents = ['en'=>$dadosUsuario['usuarioNome'] . ' fez uma pergunta no local em que você está! Clique para responder'];
                $fields = [
                    'include_player_ids'=>[$v['playerId']], 
                    'data'=>['pagina'=>34, 'perguntasId'=>$perguntasId, 'usuarioId'=>$v['usuarioId'], 'visibilidadeId'=>$v['visibilidadeId']], 
                    'contents'=>$contents, 
                    'headings'=>['en'=>'Uma pergunta em seu local!']];
                
                $alerta = Conteiner::get('Alerta');
                $response[] = $alerta->enviar($fields);
                
                $usuarios[] = $v['usuarioId'];
                $perguntasIds[] = $perguntasId;
                $localIds[] = $localId;
                $tipo[] = 1;
            }
            
            $alerta->cadastrarAlerta($usuarios, $tipo, $response, $perguntasIds, false, false, $localIds);
        }
    }
}
