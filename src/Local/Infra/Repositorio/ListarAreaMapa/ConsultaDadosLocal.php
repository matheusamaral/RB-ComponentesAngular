<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDadosLocal {
    
    public function consultar($localId, $usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localTitulo')
                ->add('case when ci.id is not null then 0 else 1 end', 'distancia');
        $query->from('local', 'l');
        $query->join('usuario', 'u', 'left')->on('u.ativo = 1');
        $query->join('check_in', 'ci', 'left')->on('ci.usuario_id = u.id')
                ->on('ci.local_id = l.id')
                ->on('ci.presente = 1')
                ->on('ci.ativo = 1');
        $query->where('l.id = ?')
                ->add('u.id = ?');
        $query->addVariaveis([$localId, $usuarioId]);
        return $query->executar('A');
    }
}