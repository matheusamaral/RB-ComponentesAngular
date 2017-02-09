<?php
namespace Quickpeek\Usuario\Aplicacao\Internet;
use Rubeus\ContenerDependencia\Conteiner;

class VerificarInternet {
    
    public function verificarInternet($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $id = Conteiner::get('ConsultaVerificarInternet')->consultarExistente($usuarioId);
        if($id){
            $msg->setCampo('UsuarioOnline::id', $id);
        }
        
        $msg->setCampo('entidade', 'UsuarioOnline');
        $msg->setCampo('UsuarioOnline::usuarioId', $usuarioId);
        $msg->setCampo('UsuarioOnline::momento', date('Y-m-d H:i:s'));
        
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}