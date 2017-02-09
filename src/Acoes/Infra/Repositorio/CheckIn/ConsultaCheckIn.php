<?php
namespace Quickpeek\Acoes\Infra\Repositorio\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaCheckIn {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('automatico')
                ->add('confirmado')
                ->add('local_id', 'localId');
        $query->from('check_in');
        $query->where('usuario_id = ?')
                ->add('presente = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
}