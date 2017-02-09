<?php
namespace Quickpeek\Local\Infra\Repositorio\Dados;
use Rubeus\ContenerDependencia\Conteiner;

class DadosLocal {
    
    public function consultar($localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('titulo');
        $query->from('local');
        $query->where('id = ?');
        $query->addVariaveis($localId);
        return $query->executar('A');
    }
}