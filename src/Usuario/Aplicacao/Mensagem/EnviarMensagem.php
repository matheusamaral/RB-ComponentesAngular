<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\Servicos\Entrada\Sessao;

class EnviarMensagem {
    
    public function enviarMensagem($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        $arquivo = $msg->getCampo('ArquivoBase64')->get('valor');
        
        if($arquivo){
            $this->salvarFoto($msg);
        }
        
        $bloqueoou = Conteiner::get('ConsultaBloqueado')->consultar($usuarioId, $usuarioMensagemId, $visibilidadeUsuarioId);
        
        if(!$bloqueoou){
            $bloqueado = Conteiner::get('ConsultaBloqueado')->consultar($usuarioMensagemId, $usuarioId, $visibilidadeMensagensId);
            if($bloqueado){
                $msg->setCampo('Mensagens::statusMensagemId', 4);
            }
            $cadastro = Conteiner::get('Cadastro');
            $msg->setCampo('entidade', 'Mensagens');
            $msg->setCampo('Mensagens::usuarioId', $usuarioId);
            if($this->verificarPaginaUsuario($msg)){
                $msg->setCampo('Mensagens::visualizado', 1);
            }
            $cad = $cadastro->cadastrar($msg);
            if($cad){
                $this->conexaoSocket($msg);
                $msg->setResultadoEtapa(true);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }else{
            $msg->setResultadoEtapa(false, false, ['bloqueoou'=>1]);
        }
    }
    
    private function salvarFoto($msg){
        
        $enderecoFoto = '/file/imagem/'.date('Y_m_d_H_i_s_'). rand(90000, 9999999999).'.jpeg';
        $msg->setCampoSessao('ultimasImagens,0', DIR_BASE . $enderecoFoto);
        Conteiner::get('Base64')->upload($msg->getCampo('ArquivoBase64')->get('valor'), DIR_BASE.$enderecoFoto);
        $url = $this->imagemUpada('imagem', 'mensagens', 0, 1);
        $msg->setCampo('Mensagens::endereco', $url);
    }
    
    private function imagemUpada($atributo, $pasta, $id=false, $tipo=false){
        if(Sessao::get('ultimasImagens,'.$id)){
            $dados = array( 'h-0' => false,'hr-0' => false,
                        'w-0' => false,'wr-0' => false,
                        'y-0' => false,'x-0' => false);
            
            return Conteiner::get('Imagem')->ImagemUpada($atributo, $pasta, $dados, $id, $tipo);
        }
    }
    
    private function verificarPaginaUsuario($msg){
        
        $usuario = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        
        $paginaConversas = 38 . '-' . $usuarioMensagemId;
        $cmd = Conteiner::get('Socket');
    }
    
    private function conexaoSocket($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        
        $agrupamento = $usuarioMensagemId . '-' . $usuarioId . '-' . $visibilidadeMensagensId . '-' . $visibilidadeUsuarioId;
        $agrupamentoUsuario = $usuarioId . '-' . $usuarioMensagemId . '-' . $visibilidadeUsuarioId . '-' . $visibilidadeMensagensId;
        
        $paginaConversas = 38 . '-' . $usuarioMensagemId;
        $paginaMensagem[] = 39 . '-' . $agrupamento;
        $paginaMensagem[] = 39 . '-' . $agrupamentoUsuario;

        $cmd = Conteiner::get('Socket');
        
        $dados1 = $cmd->getConexao($usuarioId, $paginaConversas);
        $dados2 = $cmd->getConexao($usuarioId, $paginaMensagem[0]);
        $dados3 = $cmd->getConexao($usuarioId, $paginaMensagem[1]);
        
        $dadosUsuario = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidadeMensagens($usuarioId, $visibilidadeMensagensId);
        
        $mensagem['from'] = $dados3['fromConexao'];
        $mensagem['usuarioId'] = $dadosUsuario['usuarioId'];
        $mensagem['id'] = $msg->getCampo('Mensagens::id')->get('valor');
        $mensagem['mensagem'] = $msg->getCampo('Mensagens::titulo')->get('valor');
        $mensagem['enderecoMensagem'] = $msg->getCampo('Mensagens::endereco')->get('valor');
        $mensagem['momento'] = date('Y-m-d H:i:s');
        $mensagem['statusMensagem'] = 1;
        $mensagem['endereco'] = $dadosUsuario['usuarioEndereco'];
        $mensagem['nome'] = $dadosUsuario['usuarioNome'];
        $mensagem['notificacao'] = 0;
        
        $this->enviarNotificacaoAlerta($msg);
        
        if($dados1){
            $mensagem['to'] = $dados1['toConexao'][0];
            $mensagem['remetente'] = $dados1['remetente'][0];
            $cmd->enviarMensagem($mensagem, $mensagem['to']);
        }
        if($dados2){
            $mensagem['to'] = $dados2['toConexao'][0];
            $mensagem['remetente'] = $dados2['remetente'][0];
            $cmd->enviarMensagem($mensagem, $mensagem['to']);
        }
        if($dados3){
            $mensagem['to'] = $dados3['toConexao'][0];
            $mensagem['remetente'] = $dados3['remetente'][0];
            $cmd->enviarMensagem($mensagem, $mensagem['to']);
        }
        
        $msg->setResultadoEtapa(true);
    }
    
    private function enviarNotificacaoAlerta($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        
        $paginasAlerta[] = 22 . '-' . $usuarioMensagemId;
        $paginasAlerta[] = 36 . '-' . $usuarioMensagemId;
        $paginasAlerta[] = 8 . '-' . $usuarioMensagemId;
        
        $cmd = Conteiner::get('Socket');
        for($i = 0; $i < count($paginasAlerta); $i++){
            $dados[] = $cmd->getConexao($usuarioId, $paginasAlerta[$i]);
        }
        
        if($dados){
            foreach($dados as $v){
                $mensagem['to'] = $v['toConexao'][0];
                $mensagem['from'] = $v['fromConexao'];
                $mensagem['remetente'] = $v['remetente'][0];
                $mensagem['notificacao'] = 1;
                
                $cmd->enviarMensagem($mensagem, $mensagem['to']);
            }
        }
    }
}