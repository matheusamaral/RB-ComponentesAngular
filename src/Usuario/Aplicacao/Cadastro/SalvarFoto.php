<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class SalvarFoto {
    
    public function salvarFoto($msg){  
        if($msg->getCampo('ArquivoBase64')->get('valor')){
            $enderecoFoto = '/file/imagem/'.date('Y_m_d_H_i_s_'). rand(90000, 9999999999).'.jpeg';
            Conteiner::get('Base64')->upload($msg->getCampo('ArquivoBase64')->get('valor'), DIR_BASE.$enderecoFoto);
            $caminho = [['url' => DOMINIO_PROJETO.$enderecoFoto]];
        }else{
            $arquivo = $msg->getCampo('Arquivo')->get('valor');
            $caminho = Conteiner::get('Upload')->upar($arquivo, 'imagem', 'img');
        }
        
        if(!$caminho && $arquivo){
            $erro = Conteiner::get('Upload')->getErro();
            $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
        }else{
            $msg->setCampoSessao('salvarFoto', $caminho[0]['url']);
            $msg->setResultadoEtapa(true, false, ['endereco'=>$caminho[0]['url']]);
        }
    }
}
