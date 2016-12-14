<?php
namespace Quickpeek\Acoes\Infra\Repositorio\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaAlterarVisibilidade {
    
    public function consultar($usuarioId, $localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('check_in');
        $query->where('usuario_id = ?')
                ->add('local_id = ?')
                ->add('presente = 1')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $localId]);
        return $query->executar('{id}');
    }
}