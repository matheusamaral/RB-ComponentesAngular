<?php
namespace Quickpeek\Acoes\Aplicacao\Curtir;
use Rubeus\ContenerDependencia\Conteiner;

class Curtir {
    
    public function curtir($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $msg->setCampo('entidade', 'Curtir');
        $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
        $msg->setCampo('Curtir::visibilidadeId', $visibilidadeId);
        $msg->setCampo('Curtir::usuarioId', $usuarioId);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
