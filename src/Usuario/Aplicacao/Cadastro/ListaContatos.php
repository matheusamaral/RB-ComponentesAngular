<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class ListaContatos {
    
    public function listaContatos($msg){
        
        $nome = $msg->getCampo('ListaContatos::nome')->get('valor');
        
        foreach($nome as $v){
            $usuarioId[] = $msg->getCampoSessao('dadosUsuarioLogado,id');
        }
        
        if($usuarioId){
            $msg->setCampo('entidade', 'ListaContatos');
            $msg->setCampo('ListaContatos::usuarioId', $usuarioId);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}