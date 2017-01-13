<?php
namespace Quickpeek\Base;
use Rubeus\ContenerDependencia\Conteiner;

class UsuariosBase {
    
    public function usuariosBase($msg){
        
        for($i = 1; $i < 10105; $i++){
            $usuarios[] = $i;
            $visibilidade[] = rand(1, 3);
            $notificacao[] = rand(0,1);
            $contaprivada[] = rand(0,1);
            $contato[] = rand(0,1);
        }
        $msg->setCampo('entidade', 'Configuracoes');
        $msg->setCampo('Configuracoes::usuarioId', $usuarios);
        $msg->setCampo('Configuracoes::visibilidadeId', $visibilidade);
        $msg->setCampo('Configuracoes::notificacaoPublicacao', $notificacao);
        $msg->setCampo('Configuracoes::contaPrivada', $contaprivada);
        $msg->setCampo('Configuracoes::contato', $contato);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}

