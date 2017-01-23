<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Visibilidade;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVisibilidade {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('ifnull(ci.visibilidade_id, con.visibilidade_id)', 'visibilidade');
        $query->from('usuario', 'u');
        $query->join('check_in', 'ci', 'left')->on('ci.usuario_id = u.id')
                ->on('ci.presente = 1')
                ->on('ci.ativo = 1');
        $query->join('configuracoes', 'con', 'left')->on('con.usuario_id = u.id')
                ->on('con.ativo = 1');
        $query->where('u.id = ?')->add('u.ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{visibilidade}');
    }
    
    public function consultarRespostasVisibilidade($usuarioId, $perguntasId){
        
        $query = Conteiner::get('Query', false);
        $query->select('visibilidade_id', 'visibilidadeId');
        $query->from('respostas_visibilidade');
        $query->where('usuario_id = ?')
                ->add('perguntas_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $perguntasId]);
        return $query->executar('{visibilidadeId}');
    }
}
