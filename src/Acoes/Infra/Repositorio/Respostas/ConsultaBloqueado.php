<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaBloqueado {
    
    public function consultar($usuarioId, $perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('s.id', 'seguindo')
                ->add('b.visibilidade_id', 'visibilidadeId');
        $query->from('perguntas', 'p');
        $query->join('bloqueado', 'b')
                ->on('b.usuario_id = p.usuario_id')
                ->on('b.usuario_bloqueado_id = ?')
                ->on('b.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = p.usuario_id')
                ->on('s.usuario_seguir_id = b.usuario_bloqueado_id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->where('p.id = ?');
        $query->addVariaveis([$usuarioId, $perguntaId]);
        return $query->executar('A');
    }
}
