<?php
namespace Quickpeek\Acoes\Aplicacao\Digitando;
use Rubeus\ContenerDependencia\Conteiner;

class DigitandoMensagens {
    
    public function digitandoMensagens($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $array = explode('-', $msg->getCampo('Agrupamento')->get('valor'));
        $visibilidadeMensagensId = $msg->getCampo('VisibilidadeMensagensId')->get('valor');
        $cmd = Conteiner::get('Socket');
        
        $pagina = 39 . '-' . $array[1] . '-' . $array[0] . '-' . $array[3] . '-' . $array[2];
        
        $dados = $cmd->getConexao($usuarioId, $pagina);
        
        if($dados){
            $dadosUsuario = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidadeMensagens($usuarioId, $visibilidadeMensagensId);
            
            for($i = 0; $i < count($dados['toConexao']); $i++){
                $mensagem[$i]['to'] = $dados['toConexao'][$i];
                $mensagem[$i]['from'] = $dados['fromConexao'];
                $mensagem[$i]['pagina'] = $dados['paginas'][$i];
                $mensagem[$i]['remetente'] = $dados['remetente'][$i];
                $mensagem[$i]['digitando'] = 1;
                $mensagem[$i]['usuarioId'] = $dadosUsuario['usuarioId'];
                $mensagem[$i]['usuarioNome'] = $dadosUsuario['usuarioNome'];
                $mensagem[$i]['endereco'] = $dadosUsuario['usuarioEndereco'];
                
                $cmd->enviarMensagem($mensagem[$i], $mensagem[$i]['to']);
            }
        }
        $msg->setResultadoEtapa(true);
    }
}