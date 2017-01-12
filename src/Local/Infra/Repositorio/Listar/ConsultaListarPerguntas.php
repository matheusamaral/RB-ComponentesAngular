<?php
namespace Quickpeek\Local\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarPerguntas {
    
    public function consultar($localId, $usuarioId, $tempoPergunta, $tempoResposta){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct p.id', 'id')
                ->add('p.titulo', 'titulo')
                ->add('p.usuario_id', 'usuarioId')
                ->add('p.respondida', 'respondida')
                ->add('count(distinct r.id) - count(distinct rv.id)', 'respostas')
                ->add('case when u.ativo = 0 then ' . "'FotoPadrão'"
                        . ' when p.visibilidade_id = 1 then u.endereco'
                        . ' when p.visibilidade_id = 2 and s.id is not null then u.endereco'
                        . ' else a.endereco end', 'endereco')
                ->add('case when u.ativo = 0 then ' . "'Usuário do Quickpeek'"
                        . ' when p.visibilidade_id = 1 then u.nome'
                        . ' when p.visibilidade_id = 2 and s.id is not null then u.nome'
                        . ' else a.nome end', 'nome')
                ->add('p.momento', 'momento');
        $query->from('perguntas', 'p');
        $query->join('usuario', 'u', 'left')->on('u.id = p.usuario_id');
        $query->join('respostas', 'r', 'left')->on('r.perguntas_id = p.id')
                ->on('r.momento > date_add(now(), INTERVAL -? HOUR) and r.ativo = 1');
        $query->join('respostas_visualizadas', 'rv', 'left')->on('rv.usuario_id = ?')
                ->on('rv.respostas_id = r.id and rv.ativo = 1');
        $query->join('seguir', 's', 'left')->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1 and s.ativo = 1');
        $query->join('avatares', 'a', 'left')->on('a.id = u.avatares_id and a.ativo = 1');
        $query->join('pergunta_excluida', 'pe', 'left')
                ->on('pe.perguntas_id = p.id')
                ->on('pe.usuario_id = ?')
                ->on('pe.ativo = 1');
        $query->where('p.local_id = ?')
                ->add('pe.id is null')
                ->add('p.momento > date_add(now(), INTERVAL -? HOUR)');
        $query->group('p.id');
        $query->order('p.momento desc');
        $query->addVariaveis([$tempoResposta, $usuarioId, $usuarioId, $usuarioId, $localId, $tempoPergunta]);
        return $query->executar();
    }
}