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
                        . 'radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) > 0.03');
        $query->addVariaveis([$usuarioId, $latitude, $longitude, $latitude]);
        return $query->executar('{id}');
    }
    
    public function consultarCasaTrabalho($usuarioId, $latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('casa')
                ->add('trabalho')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(latitude_casa)) * cos(radians(?) - '
                        . 'radians(longitude_casa)) + sin(radians(?)) * sin(radians(latitude_casa))))', 'distanciaCasa')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(latitude_trabalho)) * cos(radians(?) - '
                        . 'radians(longitude_trabalho)) + sin(radians(?)) * sin(radians(latitude_trabalho))))', 'distanciaTrabalho');
        $query->from('casa_trabalho');
        $query->where('usuario_id = ?')
                ->add('(casa = 1 or trabalho = 1)');
        $query->addVariaveis([$latitude, $longitude, $latitude,
            $latitude, $longitude, $latitude, $usuarioId]);
        return $query->executar('A');
    }
}
