<?php
namespace Quickpeek\Usuario\Aplicacao\Editar;
use Rubeus\ContenerDependencia\Conteiner;

class EditarContato {
    
    public function editarContato($msg){
        
        $msg->setCampo('Configuracoes::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        $msg->setCampo('entidade', 'Configuracoes');
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}