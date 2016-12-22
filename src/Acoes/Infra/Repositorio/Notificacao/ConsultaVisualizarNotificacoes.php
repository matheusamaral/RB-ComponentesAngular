<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Notificacao;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVisualizarNotificacoes {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('notificacoes');
        $query->where('usuario_id = ?')
                ->add('visualizado = 0')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('AA1', false, 'id');
    }
}
