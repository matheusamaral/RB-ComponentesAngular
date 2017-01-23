<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class Respostas {
    
    public function respostas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        
        $bloqueado = $this->checarBloqueado($msg);

        if($bloqueado){
            $msg->setCampo('Respostas::bloqueado', 1);
        }
        $checkIn = Conteiner::get('ConsultaCheckIn')->consultar($usuarioId, $perguntaId);

        if($checkIn){
            $msg->setCampo('Respostas::checkIn', 1);
        }else{
            $msg->setCampo('Respostas::checkIn', 0);
        }
        
        $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultarRespostasVisibilidade($usuarioId, $perguntaId);
        $msg->setCampo('entidade', 'Respostas');
        $msg->setCampo('Respostas::visibilidadeId', $visibilidadeId);
        $msg->setCampo('Respostas::usuarioId', $usuarioId);
        $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        
        if($cad){
            $this->setarVisualizada($msg);
            $this->enviarNotificacao($msg);
            $this->conexaoSocket($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function setarVisualizada($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $respostasId = $msg->getCampo('Respostas::id')->get('valor');
        
        $msg->setCampo('entidade', 'RespostasVisualizadas');
        $msg->setCampo('RespostasVisualizadas::usuarioId', $usuarioId);
        $msg->setCampo('RespostasVisualizadas::respostasId', $respostasId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
    
    private function checarBloqueado($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        
        $bloqueado = Conteiner::get('ConsultaBloqueado')->consultar($usuarioId, $perguntaId);
        if($bloqueado){
            $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
            if($bloqueado['visibilidadeId'] == 1 && ($visibilidadeId == 1 || 
                    ($visibilidadeId == 2 && $bloqueado['seguindo'])) || $bloqueado['visibilidadeId'] == 2
                    && ($visibilidadeId == 3 || ($visibilidadeId == 2 && !$bloqueado['seguindo']))){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    
    private function enviarNotificacao($msg){
        
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        $usuarioNotificacaoId = Conteiner::get('ConsultaUsuarioPergunta')->consultar($perguntaId);
        $cadastro = Conteiner::get('Cadastro');
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        if($usuarioNotificacaoId && $usuarioNotificacaoId != $usuarioId){
            $respostaId = $msg->getCampo('Respostas::id')->get('valor');
            $msg->setCampo('entidade', 'Notificacoes');
            $msg->setCampo('Notificacoes::respostaId', $respostaId);
            $msg->setCampo('Notificacoes::usuarioId', $usuarioNotificacaoId);
            $msg->setCampo('Notificacoes::usuarioAcaoId', $usuarioId);
            $msg->setCampo('Notificacoes::tipoId', 3);
            $cadastro->cadastrar($msg);
        }
    }
    
     private function conexaoSocket($msg){
         
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultarRespostasVisibilidade($usuarioId, $perguntaId);
        
        $localId = Conteiner::get('ConsultaLocalId')->consultar($perguntaId);
        
        $dadosBanco = Conteiner::get('DadosBanco');
        $pagina[] = '34' . '-' . $perguntaId;
        $pagina[] = '27' . '-' . $localId;

        for($i = 0; $i < count($dadosBanco); $i++){
            if($dadosBanco[$i]['usuario'] == $usuarioId){
                $fromConexao = $dadosBanco[$i]['conexao'];
            }
            foreach($dadosBanco[$i] as $k=>$v){
                if($k == 'pagina' && $v == $pagina[0]){
                    $toConexao[] = $dadosBanco[$i]['conexao'];
                    $usuarios[] = $dadosBanco[$i]['usuario'];
                    $paginas[] = $pagina[0];
                }
                if($k == 'pagina' && $v == $pagina[1]){
                    $toConexaoLocal[] = $dadosBanco[$i]['conexao'];
                    $usuariosLocal[] = $dadosBanco[$i]['usuario'];
                    $paginasLocal[] = $pagina[1];
                }
            }
        }
        
        $cmd = Conteiner::get('Socket');
        if($usuarios){
            foreach($usuarios as $v){
                $dadosUsuario[] = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidade($usuarioId, $visibilidadeId, $v);
            }
            
            for($i = 0; $i < count($toConexao); $i++){
                $mensagem[$i]['to'] = $toConexao[$i];
                $mensagem[$i]['from'] = $fromConexao;
                $mensagem[$i]['pagina'] = $paginas[$i];
                $mensagem[$i]['respostaId'] = $msg->getCampo('Respostas::id')->get('valor');
                $mensagem[$i]['respostaTitulo'] = $msg->getCampo('Respostas::titulo')->get('valor');
                $mensagem[$i]['enderecoMidia'] = $msg->getCampo('Respostas::endereco')->get('valor');
                $mensagem[$i]['usuarioId'] = $dadosUsuario[$i]['usuarioId'];
                $mensagem[$i]['nomeUsuario'] = $dadosUsuario[$i]['usuarioNome'];
                $mensagem[$i]['enderecoUsuario'] = $dadosUsuario[$i]['usuarioEndereco'];
                $mensagem[$i]['momento'] = date('Y-m-d H:i:s');
                
                $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
            }
        }
        
        if($usuariosLocal){
            for($i = 0; $i < count($toConexaoLocal); $i++){
                $mensagem2[$i]['to'] = $toConexaoLocal[$i];
                $mensagem2[$i]['from'] = $fromConexao;
                $mensagem2[$i]['pagina'] = $paginasLocal[$i];
                $mensagem2[$i]['pergunta'] = 0;
                $mensagem2[$i]['perguntaId'] = $msg->getCampo('Respostas::perguntasId')->get('valor');
                
                $cmd->enviarMensagem($mensagem2[$i], $mensagem2[$i]['to']);
            }
        }
        $msg->setResultadoEtapa(true);
    }
}
