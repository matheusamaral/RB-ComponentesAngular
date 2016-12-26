<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarNotificacoes {
    
    public function consultar($usuarioId, $notIn){
        
        $query = Conteiner::get('Query', false);
        $query->select('n.id', 'id')
                ->add('case when n.resposta_id is null then u.nome'
                        . ' when r.visibilidade_id = 1 then u.nome'
                        . ' when r.visibilidade_id = 2 and s.id is not null then u.nome'
                        . ' else a.nome end', 'pre')
                ->add('tn.nome', 'meio')
                ->add('l.titulo', 'pos')
                ->add('case when n.resposta_id is null then u.endereco'
                        . ' when r.visibilidade_id = 1 then u.endereco'
                        . ' when r.visibilidade_id = 2 and s.id is not null then u.endereco'
                        . ' else a.endereco end', 'endereco')
                ->add('timestampdiff(minute, n.momento, now())', 'minutos');
        $query->from('notificacoes', 'n');
        $query->join('tipo_notificacoes', 'tn')
                ->on('tn.id = n.tipo_id')
                ->on('tn.ativo = 1');
        $query->join('usuario', 'u')
                ->on('u.id = n.usuario_acao_id')
                ->on('u.ativo = 1');
        $query->join('respostas', 'r', 'left')
                ->on('r.id = n.resposta_id');
        $query->join('perguntas', 'p', 'left')
                ->on('p.id = r.perguntas_id');   
        $query->join('hashtag_local', 'hl', 'left')
                ->on('hl.id = n.hashtag_local_id');
        $query->join('midia', 'm', 'left')
                ->on('m.id = n.midia_id');
        $query->join('local', 'l', 'left')
                ->on('l.id = ifnull(p.local_id, ifnull(hl.local_id, m.local_id))');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = n.usuario_id')
                ->on('s.usuario_seguir_id = n.usuario_acao_id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('avatares', 'a', 'left')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');     
        $query->where('n.usuario_id = ?')
                ->add('n.id not in('. $notIn . ')')
                ->add('n.ativo = 1');
        $query->order('timestampdiff(second, n.momento, now())');
        $query->limit(15);
        $query->addVariaveis($usuarioId);
        return $query->executar();
    }
}
