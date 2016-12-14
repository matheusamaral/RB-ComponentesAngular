<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class SalvarFoto {
    
    public function salvarFoto($msg){
        
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
        $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');
        
        if(!$caminho && $arquivo){
            $erro = Conteiner::get('Upload')->getErro();
            $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
        }else{
            $msg->setCampoSessao('salvarFoto', $caminho[0]['url']);
            $msg->setResultadoEtapa(true, false, ['endereco'=>$caminho[0]['url']]);
        }
    }
}