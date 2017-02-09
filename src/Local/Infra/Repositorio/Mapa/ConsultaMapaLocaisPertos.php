<?php
namespace Quickpeek\Local\Infra\Repositorio\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaMapaLocaisPertos {
    
    public function consultar($latitude, $longitude, $usuarioId){
        
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
                ->add('cl.titulo', 'categoriaNome')
                ->add("concat('" . DOMINIO_PROJETO . "',cl.endereco)", 'categoriaEndereco');
        $query->from('local', 'l');
        $query->join('local_categoria', 'lc')
                ->on('lc.local_id = l.id')
                ->on('lc.ativo = 1');
        $query->join('categoria_local', 'cl')
                ->on('cl.id = lc.categoria_id')
                ->on('cl.ativo = 1');
        $query->join('check_in', 'ci', 'left')
                ->on('ci.local_id = l.id')
                ->on('ci.usuario_id = ?')
                ->on('ci.presente = 1')
                ->on('ci.ativo = 1');
        $query->where('l.ativo = 1')
                ->add('ci.id is null');
        $query->having('distancia <= 0.03');
        $query->group('l.id');
        $query->order('distancia');
        $query->limit(40);
        $query->addVariaveis([$latitude, $longitude, $latitude, $usuarioId]);
        return $query->executar();
    }
}
