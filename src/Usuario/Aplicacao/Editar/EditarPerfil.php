<?php
namespace Quickpeek\Usuario\Aplicacao\Editar;
use Rubeus\ContenerDependencia\Conteiner;

class EditarPerfil {
    
    public function editarPerfil($msg){
        
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
        $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');
        
        if(!$caminho && $arquivo){
            $erro = Conteiner::get('Upload')->getErro();
            $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
        }else{
            $msg->setCampo('entidade', 'Usuario');
            $msg->setCampo('Usuario::id', $msg->getCampoSessao('dadosUsuarioLogado,id'));
            $msg->setCampo('Usuario::endereco', $caminho[0]['url']);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}