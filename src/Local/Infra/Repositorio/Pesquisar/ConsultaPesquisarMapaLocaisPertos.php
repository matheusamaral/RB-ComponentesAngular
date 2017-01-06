<?php
namespace Quickpeek\Local\Infra\Repositorio\Pesquisar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaPesquisarMapaLocaisPertos {
    
    public function consultar($latitude, $longitude, $nome){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct (6371 * acos(cos(radians(?)) * cos(radians(latitude)) '
                . '* cos(radians(?) - radians(longitude)) + sin(radians(?)) * sin(radians(latitude))))', 'distancia')
                ->add('id')
                ->add('titulo');
        $query->from('local');
        $query->where()->like('titulo', $nome);
        $query->having('distancia <= 0.02');
        $query->order('distancia');
        $query->addVariaveis([$latitude, $longitude, $latitude]);
        return $query->executar();
    }
}