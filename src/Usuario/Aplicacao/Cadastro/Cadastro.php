<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Cadastro {
    
    public function cadastro($msg){
        
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
        $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');
        var_dump($arquivo);
        exit();
        if(!$caminho && $arquivo){
            $erro = Conteiner::get('Upload')->getErro();
            $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
        }else{
            $msg->setCampo('Usuario::endereco', $caminho);
            $msg->setCampo('entidade', 'Usuario');
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}
