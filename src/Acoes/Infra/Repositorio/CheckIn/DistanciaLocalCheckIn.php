<?php
namespace Quickpeek\Acoes\Infra\Repositorio\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class DistanciaLocalCheckIn {
    
    public function consultar($usuarioId, $latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('c.id', 'id');
        $query->from('local', 'l');
        $query->join('check_in', 'c')
                ->on('c.usuario_id = ?')
                ->on('c.local_id = l.id')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->where('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - '
                        . 'radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) > 0.03')
                ->add('l.ativo = 1');
        $query->addVariaveis([$usuarioId, $latitude, $longitude, $latitude]);
        return $query->executar('{id}');
    }
}
