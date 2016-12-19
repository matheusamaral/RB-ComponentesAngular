<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarNaoVisualizadas {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('mensagens');
        $query->where('status_mensagem_id in(1,2)')
                ->add('usuario_mensagem_id = ?')
                ->add('visualizado = 0')
                ->add('ativo = 1');
        $query->group('usuario_id');
        $query->addVariaveis([$usuarioId]);
        return $query->executar();
    }
    
    public function consultarNotificacoes($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(distinct id)');
        $query->from('notificacoes');
        $query->where('usuario_id = ?')
                ->add('visualizado = 0')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar();
    }
}