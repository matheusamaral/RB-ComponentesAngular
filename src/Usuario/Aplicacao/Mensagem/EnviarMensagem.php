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
    
    private function conexaoSocket($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeMensagensId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        
        $agrupamento = $usuarioMensagemId . '-' . $usuarioId . '-' . $visibilidadeMensagensId . '-' . $visibilidadeUsuarioId;
        $agrupamentoUsuario = $usuarioId . '-' . $usuarioMensagemId . '-' . $visibilidadeUsuarioId . '-' . $visibilidadeMensagensId;
        
        $paginaConversas = 36 . '-' . $usuarioMensagemId;
        $paginaMensagem[] = 37 . '-' . $agrupamento;
        $paginaMensagem[] = 37 . '-' . $agrupamentoUsuario;
        
        $cmd = Conteiner::get('Socket');
        $dados1 = $cmd->getConexao($usuarioId, $paginaConversas);
        $dados2 = $cmd->getConexao($usuarioId, $paginaMensagem[0]);
        $dados3 = $cmd->getConexao($usuarioId, $paginaMensagem[1]);
        
        $dadosUsuario[] = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidadeMensagens($usuarioId, $visibilidadeMensagensId);

        for($i = 0; $i < count($dados1['toConexao']); $i++){
            $mensagem[$i]['to'] = $dados1['toConexao'][$i];
            $mensagem[$i]['from'] = $dados1['fromConexao'];
            $mensagem[$i]['pagina'] = $dados1['paginas'][$i];
            $mensagem[$i]['usuarioId'] = $dadosUsuario['usuarioId'];
            $mensagem[$i]['id'] = $msg->getCampo('Mensagens::id')->get('valor');
            $mensagem[$i]['mensagem'] = $msg->getCampo('Mensagens::titulo')->get('valor');
            $mensagem[$i]['enderecoMensagem'] = $msg->getCampo('Mensagens::endereco')->get('valor');
            $mensagem[$i]['momento'] = date('Y-m-d H:i:s');
            $mensagem[$i]['statusMensagem'] = 1;
            $mensagem[$i]['endereco'] = $dadosUsuario['usuarioEndereco'];
            $mensagem[$i]['nome'] = $dadosUsuario['usuarioNome'];

            $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
        }
        
        for($i = 0; $i < count($dados2['toConexao']); $i++){
            $mensagem[$i]['to'] = $dados2['toConexao'][$i];
            $mensagem[$i]['from'] = $dados2['fromConexao'];
            $mensagem[$i]['pagina'] = $dados2['paginas'][$i];
            $mensagem[$i]['usuarioId'] = $dadosUsuario['usuarioId'];
            $mensagem[$i]['id'] = $msg->getCampo('Mensagens::id')->get('valor');
            $mensagem[$i]['mensagem'] = $msg->getCampo('Mensagens::titulo')->get('valor');
            $mensagem[$i]['enderecoMensagem'] = $msg->getCampo('Mensagens::endereco')->get('valor');
            $mensagem[$i]['momento'] = date('Y-m-d H:i:s');
            $mensagem[$i]['statusMensagem'] = 1;
            $mensagem[$i]['endereco'] = $dadosUsuario['usuarioEndereco'];
            $mensagem[$i]['nome'] = $dadosUsuario['usuarioNome'];

            $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
        }
        
        for($i = 0; $i < count($dados3['toConexao']); $i++){
            $mensagem[$i]['to'] = $dados3['toConexao'][$i];
            $mensagem[$i]['from'] = $dados3['fromConexao'];
            $mensagem[$i]['pagina'] = $dados3['paginas'][$i];
            $mensagem[$i]['usuarioId'] = $dadosUsuario['usuarioId'];
            $mensagem[$i]['id'] = $msg->getCampo('Mensagens::id')->get('valor');
            $mensagem[$i]['mensagem'] = $msg->getCampo('Mensagens::titulo')->get('valor');
            $mensagem[$i]['enderecoMensagem'] = $msg->getCampo('Mensagens::endereco')->get('valor');
            $mensagem[$i]['momento'] = date('Y-m-d H:i:s');
            $mensagem[$i]['statusMensagem'] = 1;
            $mensagem[$i]['endereco'] = $dadosUsuario['usuarioEndereco'];
            $mensagem[$i]['nome'] = $dadosUsuario['usuarioNome'];
            
            $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
        }
        $msg->setResultadoEtapa(true);
    }
}