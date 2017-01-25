<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\Servicos\Entrada\Sessao;

class Respostas {
    
    public function respostas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        $arquivo = $msg->getCampo('ArquivoBase64')->get('valor');
        
        if($arquivo){
            $this->salvarFoto($msg);
        }
        
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
    
    private function salvarFoto($msg){
        
        $enderecoFoto = '/file/imagem/'.date('Y_m_d_H_i_s_'). rand(90000, 9999999999).'.jpeg';
        $msg->setCampoSessao('ultimasImagens,0', DIR_BASE . $enderecoFoto);
        Conteiner::get('Base64')->upload($msg->getCampo('ArquivoBase64')->get('valor'), DIR_BASE.$enderecoFoto);
        $url = $this->imagemUpada('imagem', 'respostas', 0, 1);
        $msg->setCampo('Respostas::endereco', $url);
    }
    
    private function imagemUpada($atributo, $pasta, $id=false, $tipo=false){
        if(Sessao::get('ultimasImagens,'.$id)){
            $dados = array( 'h-0' => false,'hr-0' => false,
                        'w-0' => false,'wr-0' => false,
                        'y-0' => false,'x-0' => false);
            
            return Conteiner::get('Imagem')->ImagemUpada($atributo, $pasta, $dados, $id, $tipo);
        }
    }
    
    private function setarVisualizada($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $respostaId = $msg->getCampo('Respostas::id')->get('valor');
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        
        $pagina = 34 . '-' . $perguntaId;
        
        $cmd = Conteiner::get('Socket');
        $dados = $cmd->getConexao($usuarioId, $pagina);
        
        foreach($dados['usuarios'] as $v){
            $respostasId[] = $respostaId;
            $usuarios[] = $dados['usuarios'];
        }
        
        $msg->setCampo('entidade', 'RespostasVisualizadas');
        $msg->setCampo('RespostasVisualizadas::usuarioId', $usuarios);
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
        
        $cmd = Conteiner::get('Socket');
        $paginaPergunta = '34' . '-' . $perguntaId;
        $paginaLocal = '27' . '-' . $localId;
        
        $dadosPergunta = $cmd->getConexao($usuarioId, $paginaPergunta);
        $dadosLocal = $cmd->getConexao($usuarioId, $paginaLocal);
        
        if($dadosPergunta['usuarios']){
            $dadosUsuario = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidadeMensagens($usuarioId, $visibilidadeId);
            
            for($i = 0; $i < count($dadosPergunta['toConexao']); $i++){
                $mensagem[$i]['to'] = $dadosPergunta['toConexao'][$i];
                $mensagem[$i]['from'] = $dadosPergunta['fromConexao'];
                $mensagem[$i]['pagina'] = $dadosPergunta['paginas'][$i];
                $mensagem[$i]['remetente'] = $dadosPergunta['remetente'][$i];
                $mensagem[$i]['respostaId'] = $msg->getCampo('Respostas::id')->get('valor');
                $mensagem[$i]['respostaTitulo'] = $msg->getCampo('Respostas::titulo')->get('valor');
                $mensagem[$i]['enderecoMidia'] = $msg->getCampo('Respostas::endereco')->get('valor');
                $mensagem[$i]['usuarioId'] = $dadosUsuario['usuarioId'];
                $mensagem[$i]['nomeUsuario'] = $dadosUsuario['usuarioNome'];
                $mensagem[$i]['enderecoUsuario'] = $dadosUsuario['usuarioEndereco'];
                $mensagem[$i]['momento'] = date('Y-m-d H:i:s');
                
                $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
            }
        }
        
        if($dadosLocal['usuarios']){
            for($i = 0; $i < count($dadosLocal['toConexao']); $i++){
                $mensagem2[$i]['to'] = $dadosLocal['toConexao'][$i];
                $mensagem2[$i]['from'] = $dadosLocal['fromConexao'];
                $mensagem2[$i]['pagina'] = $dadosLocal['paginas'][$i];
                $mensagem2[$i]['remetente'] = $dadosLocal['remetente'][$i];
                $mensagem2[$i]['pergunta'] = 0;
                $mensagem2[$i]['perguntaId'] = $msg->getCampo('Respostas::perguntasId')->get('valor');
                
                $cmd->enviarMensagem($mensagem2[$i], $mensagem2[$i]['to']);
            }
        }
        $msg->setResultadoEtapa(true);
    }
}
