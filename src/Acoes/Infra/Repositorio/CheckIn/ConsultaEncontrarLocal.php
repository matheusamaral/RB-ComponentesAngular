<?php
namespace Quickpeek\Acoes\Infra\Repositorio\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaEncontrarLocal {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('local_id', 'localId');
        $query->from('check_in');
        $query->where('usuario_id = ?')
                ->add('ativo = 1')
                ->add('presente = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('A');
    }
}
