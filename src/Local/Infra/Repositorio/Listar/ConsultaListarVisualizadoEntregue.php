<?php
namespace Quickpeek\Local\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarVisualizadoEntregue {
    
    public function consultarEntregue($usuarioId, $perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('case when pu.visibilidade_id = 1 then u.nome'
                        . ' when pu.visibilidade_id = 2 and s.id is not null then u.nome'
                        . ' else a.nome end', 'nome')
                ->add('case when pu.visibilidade_id = 1 then u.endereco'
                        . ' when pu.visibilidade_id = 2 and s.id is not null then u.endereco'
                        . ' else a.endereco end', 'endereco')
                ->add('pa.momento', 'momento');
        $query->from('pergunta_usuario', 'pu');
        $query->join('usuario', 'u')->on('u.id = pu.usuario_id')
                ->on('u.ativo = 1');
        $query->join('seguir', 's', 'left')->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('avatares', 'a', 'left')->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('pergunta_alerta', 'pa', 'left')->on('pa.usuario_id = pu.usuario_id')
                ->on('pa.perguntas_id = pu.perguntas_id')
                ->on('pa.ativo = 1');
        $query->where('pu.visualizado = 0')->add('pu.perguntas_id = ?')
                ->add('pu.ativo = 1');
        $query->order('momento desc');
        $query->addVariaveis([$usuarioId, $perguntaId]);
        return $query->executar();
    }    
    
    public function consultarVisualizado($usuarioId, $perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('case when pu.visibilidade_id = 1 then u.nome'
                        . ' when pu.visibilidade_id = 2 and s.id is not null then u.nome'
                        . ' else a.nome end', 'nome')
                ->add('case when pu.visibilidade_id = 1 then u.endereco'
                        . ' when pu.visibilidade_id = 2 and s.id is not null then u.endereco'
                        . ' else a.endereco end', 'endereco')
                ->add('pu.momento_visualizado', 'momento');
        $query->from('pergunta_usuario', 'pu');
        $query->join('usuario', 'u')->on('u.id = pu.usuario_id')
                ->on('u.ativo = 1');
        $query->join('seguir', 's', 'left')->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('avatares', 'a', 'left')->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->where('pu.visualizado = 1')->add('pu.perguntas_id = ?')
                ->add('pu.ativo = 1');
        $query->order('momento desc');
        $query->addVariaveis([$usuarioId, $perguntaId]);
        return $query->executar();
    }
}
