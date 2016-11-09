<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class VisualizarPerguntas {
    
    public function visualizarPerguntas($msg){
        
        $msg->setCampo('entidade', 'PerguntaUsuario');
        $msg->setCampo('PerguntaUsuario::visualizado', 1);
        $msg->setCampo('PerguntaUsuario::momentoVisualizado', date('Y-m-d H:i:s'));
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}