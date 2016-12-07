<?php
namespace Quickpeek\Usuario\Aplicacao\Cadastro;
use Rubeus\ContenerDependencia\Conteiner;

class Tutorial {
    
    public function tutorial($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $dados = Conteiner::get('ConsultaDadosUsuario')->consultar($usuarioId);
        
        $msg->setCampo('entidade', 'Usuario');
        $msg->setCampo('Usuario::id', $usuarioId);
        $msg->setCampo('Usuario::tutorial', $dados['tutorial'] + 1);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}
