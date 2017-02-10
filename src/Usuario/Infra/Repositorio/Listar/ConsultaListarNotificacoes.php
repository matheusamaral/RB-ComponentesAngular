<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarNotificacoes {
    
    public function consultar($usuarioId, $notIn){
        
        $query = Conteiner::get('Query', false);
        $query->select('n.id', 'id')
                ->add('u.id', 'usuarioId')
                ->add('case when n.resposta_id is null then u.nome'
                        . ' when r.visibilidade_id = 1 then u.nome'
                        . ' else a.nome end', 'pre')
                ->add('tn.nome', 'meio')
                ->add('l.titulo', 'pos')
                ->add('case when n.resposta_id is null then u.endereco'
                        . ' when r.visibilidade_id = 1 then u.endereco'
                        . " else concat('" . DOMINIO_PROJETO . "',a.endereco) end", 'endereco')
                ->add('timestampdiff(minute, n.momento, now())', 'minutos')
                ->add('p.id', 'perguntasId')
                ->add('case when p.id is not null and r.id is not null then r.visibilidade_id else 1 end', 'visibilidadeId')
                ->add('n.tipo_id', 'tipoId')
                ->add('l.id', 'localId');
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
                ->on('l.id = ifnull(hl.local_id, m.local_id)');
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
    
    public function consultarContagemSolicitacoes($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(distinct id)', 'contagem');
        $query->from('seguir');
        $query->where('usuario_seguir_id = ?')
                ->add('confirmar_seguir = 0')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{contagem}');
    }
    
    public function consultarSolicitacoesSeguir($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('u.nome', 'usuarioNome')
                ->add('u.endereco', 'usuarioEndereco');
        $query->from('usuario', 'u');
        $query->join('seguir', 's')
                ->on('s.usuario_id = u.id')
                ->on('s.usuario_seguir_id = ?')
                ->on('s.confirmar_seguir = 0')
                ->on('s.ativo = 1');
        $query->order('s.momento desc');
        $query->limit(1);
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
}
