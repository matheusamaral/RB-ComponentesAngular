<?php
namespace Quickpeek\Usuario\Aplicacao\Editar;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class VerificarCodigoSmsEditar {
    
    public function verificarCodigoSmsEditar($msg){
        
        $telefone = $msg->getCampo('Usuario::telefone')->get('valor');
        $codigo = $msg->getCampo('Codigo')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $smsCodigo = Conteiner::get('ConsultaVerificarCodigoSms')->consultar($telefone, $codigo, 1, $tempo['sms']);
        
        $msg->setCampoSessao('smsCodigoId', $smsCodigo['id']);
        
        if($smsCodigo){
            $sessao = Conteiner::get('ConsultaSessaoBanco')->consultar($smsCodigo['usuarioId']);
            $entidade = ConteinerEntidade::getInstancia('SessaoBanco');
            $entidade->setId($sessao['id']);
            $entidade->setDadosSessao('{"codSess":"' . $sessao['codigo'] . '"}');
            $entidade->salvar();
                
            $cadastro = Conteiner::get('Cadastro');
            
            $msg->setCampo('entidade', 'SmsCodigo');
            $msg->setCampo('SmsCodigo::id', $smsCodigo['id']);
            $msg->setCampo('SmsCodigo::confirmado', 1);
            $cadastro->cadastrar($msg);
            
            $msg->setCampo('entidade', 'Usuario');
            $msg->setCampo('Usuario::id', $smsCodigo['usuarioId']);
            $msg->setCampo('Usuario::telefone', $smsCodigo['telefone']);
            $cadastro->cadastrar($msg);
                
            $msg->setCampoSessao('dadosUsuarioLogado,id', $smsCodigo['usuarioId']);
            
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}