<?php
namespace Quickpeek\Acoes\Aplicacao\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class Midia {
    
    public function midia($msg){
        
        $arquivo = $msg->getCampo('Arquivo')->get('valor');
        $caminho = Conteiner::get('Upload')->upar($arquivo, 'midia', 'mda');
        
        if(!$caminho && $arquivo){
            $erro = Conteiner::get('Upload')->getErro();
            $msg->setResultadoEtapa(false, $erro['cod'], ['arquivo' => $erro['arquivo']]);
        }else{
            $msg->setCampo('entidade', 'Midia');
            $msg->setCampo('Midia::endereco', $caminho[0]['url']);
            $msg->setCampo('Midia::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
            Conteiner::get('Cadastro')->cadastrar($msg);
        }
    }
}
