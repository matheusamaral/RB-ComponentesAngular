<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaRespostas {
    
    public function consultar($perguntaId, $usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('c.id');
        $query->from('check_in', 'c');
        $query->join('perguntas', 'p')
                ->on('p.local_id = c.local_id')
                ->on('p.ativo = 1');
        $query->where('c.usuario_id = ?')
                ->add('p.id = ?')
                ->add('c.ativo = 1')
                ->add('c.presente = 1');
        $query->addVariaveis([$usuarioId, $perguntaId]);
        return $query->executar();
    }
}
