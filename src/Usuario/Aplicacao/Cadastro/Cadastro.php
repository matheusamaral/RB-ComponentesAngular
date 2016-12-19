<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Cadastro {
    
    public function cadastro($msg){
        
        $cadastro = Conteiner::get('Cadastro');
        
        $msg->setCampo('entidade', 'Usuario');
        $msg->setCampo('Usuario::endereco', $msg->getCampoSessao('salvarFoto'));
        $msg->setCampo('Usuario::smsCodigoId', $msg->getCampoSessao('smsCodigoId'));
        $msg->setCampo('Usuario::telefone', $msg->getCampoSessao('dadosUsuarioLogado,telefone'));
        $cadastro->cadastrar($msg);
        
        $msg->setCampoSessao('dadosUsuarioLogado,id', $msg->getCampo('Usuario::id')->get('valor'));
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $msg->setCampo('entidade', 'NumerounicoUsuario');
        $msg->setCampo('NumerounicoUsuario::id', 
                Conteiner::get('ConsultaVerificarNumero')->consultarIdNumero($msg->getCampoSessao('numerounico')));
        $msg->setCampo('NumerounicoUsuario::usuarioId', $usuarioId);
        $cad = $cadastro->cadastrar($msg);
        
        if($cad){
            $msg->setCampo('entidade', 'Configuracoes');
            $msg->setCampo('Configuracoes::usuarioId', $usuarioId);
            $cadastro->cadastrar($msg);
        }
    }
}
