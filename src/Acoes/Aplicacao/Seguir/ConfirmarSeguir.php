<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class ConfirmarSeguir {
    
    public function confirmarSeguir($msg){
        
        $aceitar = $msg->getCampo('Aceitar')->get('valor');
        
        if($aceitar){
            $msg->setCampo('entidade', 'Seguir');
            $msg->setCampo('Seguir::confirmarSeguir', 1);
            $msg->setCampo('Seguir::momentoConfirmarSeguir', date('Y-m-d H:i:s'));
            $cad = Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $entidade = ConteinerEntidade::getInstancia('Seguir');
            $entidade->setId($msg->getCampo('Seguir::id')->get('valor'));
            $qtdErro = $entidade->deletar();
        }
        
        if($cad){
            $this->enviarNotificacoes($msg);
        }elseif(!$qtdErro){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function enviarNotificacoes($msg){
        
        $seguirId = $msg->getCampo('Seguir::id')->get('valor');
        $dadosSeguir = Conteiner::get('ConsultaUsuarioSeguir')->consultar($seguirId);
        
        $msg->setCampo('entidade', 'Notificacoes');
        $msg->setCampo('Notificacoes::usuarioId', $dadosSeguir['usuarioId']);
        $msg->setCampo('Notificacoes::usuarioAcaoId', $dadosSeguir['usuarioSeguirId']);
        $msg->setCampo('Notificacoes::tipoId', 2);
        Conteiner::get('Cadastro')->cadastrar($msg);
        
        $this->enviarAlerta($msg, $dadosSeguir['usuarioId']);
    }
    
    private function enviarAlerta($msg, $usuarioAlertaId){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $dadosUsuarioLogado = Conteiner::get('ConsultaListarDadosUsuario')->consultar($usuarioId);
        $dadosUsuario = Conteiner::get('ConsultaListarDadosUsuario')->consultar($usuarioAlertaId);
        
        $contents = ['en'=>$dadosUsuarioLogado['usuarioNome'] . ' aceitou seu pedido de seguidor'];
        $fields = [
            'include_player_ids'=>[$dadosUsuario['playerId']], 
            'data'=>['pagina'=>36], 
            'contents'=>$contents, 
            'headings'=>['en'=>'Aceitou seu pedido!']];
        
        $alerta = Conteiner::get('Alerta');
        $response = $alerta->enviar($fields);
        
        $alerta->cadastrarAlerta($dadosUsuario['usuarioId'], 2, $response, false, $msg->getCampo('Notificacoes::id')->get('valor'));
    }
}