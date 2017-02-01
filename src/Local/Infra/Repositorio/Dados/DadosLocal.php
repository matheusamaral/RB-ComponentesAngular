<?php
namespace Quickpeek\Local\Infra\Repositorio\Dados;
use Rubeus\ContenerDependencia\Conteiner;

class DadosLocal {
    
    public function dadosLocal($localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('*');
        $query->from('local');
        $query->where('id = ?');
        $query->addVariaveis($localId);
        return $query->executar('A');
    }
}