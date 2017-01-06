<?php
namespace Quickpeek\Local\Infra\Repositorio\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaMapaLocaisPertos {
    
    public function consultar($latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct (6371 * acos(cos(radians(?)) '
                . '* cos(radians(l.latitude)) '
                . '* cos(radians(?) '
                . '- radians(l.longitude)) '
                . '+ sin(radians(?)) '
                . '* sin(radians(l.latitude))))', 'distancia')
                ->add('l.id', 'id')
                ->add('l.titulo', 'nome')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('cl.endereco', 'categoriaEndereco')
                ->add('cl.titulo', 'categoriaNome');
        $query->from('local', 'l');
        $query->join('local_categoria', 'lc')
                ->on('lc.local_id = l.id')
                ->on('lc.ativo = 1');
        $query->join('categoria_local', 'cl')
                ->on('cl.id = lc.categoria_id')
                ->on('cl.ativo = 1');
        $query->where('l.ativo = 1');
        $query->having('distancia <= 0.02');
        $query->group('l.id');
        $query->order('distancia');
        $query->limit(4);
        $query->addVariaveis([$latitude, $longitude, $latitude]);
        return $query->executar();
    }
}
