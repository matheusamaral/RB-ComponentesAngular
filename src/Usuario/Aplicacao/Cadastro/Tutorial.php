<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Tutorial {
    
    public function tutorial($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $tutorial = Conteiner::get('ConsultaListarDadosUsuario')->consultarTutorial($usuarioId);
        
        if($tutorial){
            $msg->setCampo('entidade', 'Usuario');
            $msg->setCampo('Usuario::id', $usuarioId);
            $msg->setCampo('Usuario::tutorial', $tutorial + 1);
            Conteiner::get('Cadastro')->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
