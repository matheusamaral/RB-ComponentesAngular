<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class VerificarCodigoSms {
    
    public function verificarCodigoSms($msg){
        
        $telefone = $msg->getCampo('Usuario::telefone')->get('valor');
        
        $codigo = $msg->getCampo('Codigo')->get('valor');
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $smsCodigo = Conteiner::get('ConsultaVerificarCodigoSms')->consultar($telefone, $codigo, 0, $tempo['sms']);
        
        if($smsCodigo){
            $msg->setCampoSessao('smsCodigoId', $smsCodigo['id']);
            $msg->setCampo('entidade', 'SmsCodigo');
            $msg->setCampo('SmsCodigo::id', $smsCodigo['id']);
            $msg->setCampo('SmsCodigo::confirmado', 1);
            Conteiner::get('Cadastro')->cadastrar($msg);
            
            $usuarioId = Conteiner::get('ConsultaVerificarNumero')->consultarNumero($telefone);
            if($usuarioId){
                $numId = Conteiner::get('ConsultaVerificarNumero')->consultarNumerounico($usuarioId);
                $entidade = ConteinerEntidade::getInstancia('NumerounicoUsuario');
                $entidade->setId($numId);
                $entidade->deletar();
                
                $msg->setCampo('entidade', 'NumerounicoUsuario');
                $msg->setCampo('NumerounicoUsuario::usuarioId', $usuarioId);
                $msg->setCampo('NumerounicoUsuario::numerounico', $msg->getCampoSessao('numerounico'));
                Conteiner::get('Cadastro')->cadastrar($msg);
                
                $msg->setCampoSessao('dadosUsuarioLogado,id', $usuarioId);
                $conta = 1;
            }else{
                $conta = 0;
            }
            $msg->setResultadoEtapa(true, false, ['dados'=>$conta]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
