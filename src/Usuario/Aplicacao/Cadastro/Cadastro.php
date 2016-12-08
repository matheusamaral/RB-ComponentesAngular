<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Cadastro {
    
    public function cadastro($msg){
        
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
        $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');
        
        if(!$caminho && $arquivo){
            $erro = Conteiner::get('Upload')->getErro();
            $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
        }else{
            $cadastro = Conteiner::get('Cadastro');
            
            $msg->setCampo('entidade', 'Usuario');
            $msg->setCampo('Usuario::endereco', $caminho[0]['url']);
            $msg->setCampo('Usuario::smsCodigoId', $msg->getCampoSessao('smsCodigoId'));
            $cadastro->cadastrar($msg);
            
            $msg->setCampo('entidade', 'NumerounicoUsuario');
            $msg->setCampo('NumerounicoUsuario::id', 
            Conteiner::get('ConsultaVerificarNumero')->consultarIdNumero($msg->getCampoSessao('numerounico')));
            $msg->setCampo('NumerounicoUsuario::usuarioId', $msg->getCampo('Usuario::id')->get('valor'));
            $cadastro->cadastrar($msg);
            
            $usuarioId = $msg->getCampo('Usuario::id')->get('valor');
            
            $msg->setCampo('entidade', 'Configuracoes');
            $msg->setCampo('Configuracoes::usuarioId', $usuarioId);
            $msg->setCampo('Configuracoes::visibilidadeId', 1);
            $msg->setCampo('Configuracoes::notificacaoPresenca', 1);
            $msg->setCampo('Configuracoes::notificacaoPublicacao', 1);
            $msg->setCampo('Configuracoes::notificacaoSeguidor', 1);
            $msg->setCampo('Configuracoes::aprovacaoSeguir', 1);
            $msg->setCampo('Configuracoes::padraoAprovacao', 1);
            $cadastro->cadastrar($msg);

            $msg->setCampoSessao('dadosUsuarioLogado,id', $usuarioId);
        }
    }
}
