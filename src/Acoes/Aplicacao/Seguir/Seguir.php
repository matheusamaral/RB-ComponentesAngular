<?php
namespace Quickpeek\Acoes\Aplicacao\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class Seguir {
    
    public function seguir($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $query = Conteiner::get('ConsultaSeguir')->consultar($usuarioId, $msg->getCampo('Seguir::usuarioSeguirId')->get('valor'));
        
        if(!$query['id']){
            
            if($query['padrao'] == 0){
                $msg->setCampo('Seguir::confirmarSeguir', 1);
                $msg->setCampo('Seguir::momentoConfirmarSeguir', date('Y-m-d H:i:s'));
            }
            $msg->setCampo('entidade', 'Seguir');
            $msg->setCampo('Seguir::usuarioId', $usuarioId);
            Conteiner::get('Cadastro')->cadastrar($msg);
            
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
