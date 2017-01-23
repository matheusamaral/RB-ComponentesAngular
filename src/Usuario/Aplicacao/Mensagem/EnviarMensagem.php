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
        
        $paginaConversas[] = 36;
        $paginaMensagem[] = 37;
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $usuarioMensagemId = $msg->getCampo('Mensagens::usuarioMensagemId')->get('valor');
        $visibilidadeId = $msg->getCampo('Mensagens::visibilidadeMensagensId')->get('valor');
        $visibilidadeUsuarioId = $msg->getCampo('Mensagens::visibilidadeUsuarioId')->get('valor');
        
        $mensagemId = $msg->getCampo('Mensagens::id')->get('valor');
        $mensagem = $msg->getCampo('Mensagens::titulo')->get('valor');
        $mensagemEndereco = $msg->getCampo('Mensagens::endereco')->get('valor');
        $agrupamento = $usuarioId . "-" . $usuarioMensagemId . "-" . $visibilidadeUsuarioId . "-" . $visibilidadeId;
        var_dump($agrupamento);
        $dadosUsuario = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidade($usuarioId, $visibilidadeId);
        
        'verificar pelo agrupamentoSocket para pagina conversas';
        $dados['mensagemId'] = $mensagemId;
        $dados['mensagem'] = $mensagem;
        $dados['mensagemEndereco'] = $mensagemEndereco;
        $dados['mensagemStatus'] = 1;
        $dados['mensagemMomento'] = date('Y-m-d H:i:s');
        $dados['agrupamento'] = $agrupamento;
        $dados['from'] = $usuarioId;
        $dados['usuarioNome'] = $dadosUsuario['usuarioNome'];
        $dados['usuarioEndereco'] = $dadosUsuario['usuarioEndereco'];
        $dados['to'] = [$usuarioMensagemId];
    }
}