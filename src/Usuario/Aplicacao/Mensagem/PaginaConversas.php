<?php
namespace Quickpeek\Usuario\Aplicacao\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class PaginaConversas {
    
    public function paginaConversas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $query = Conteiner::get('ConsultaPaginaConversas')->consultar($usuarioId);
        
        if($query){
            $msg->setResultadoEtapa(true, false, ['dados'=>$query]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}