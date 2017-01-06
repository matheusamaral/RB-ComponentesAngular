<?php
namespace Quickpeek\Local\Infra\Repositorio\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSugestaoLocal {
    
    public function consultarCheckIn($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localTitulo')
                ->add('l.ativo', 'checkIn');
        $query->from('local', 'l');
        $query->join('check_in', 'c')
                ->on('c.usuario_id = ?')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->where('l.ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
    
    public function consultarSugestao($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localTitulo')
                ->add('    (6371 * ACOS(COS(RADIANS(- 16.7164795)) * COS(RADIANS(l.latitude)) * COS(RADIANS(- 42.8575164) '
                        . '- RADIANS(l.longitude)) + SIN(RADIANS(- 16.7164795)) * SIN(RADIANS(l.latitude))))', 'distancia');
        $query->from('local', 'l');
        $query->join('check_in', 'c', 'left')
                ->on('c.local_id = l.id')
                ->on('c.usuario_id = ?')
                ->on('c.presente = 0')
                ->on('c.ativo = 1');
        $query->where('(6371 * ACOS(COS(RADIANS(- 16.7164795)) * COS(RADIANS(l.latitude)) * COS(RADIANS(- 42.8575164) '
                . '- RADIANS(l.longitude)) + SIN(RADIANS(- 16.7164795)) * SIN(RADIANS(l.latitude)))) <= 0.02');
        $query->group('l.id');
        $query->order('count(c.id) desc, distancia, c.id desc');
        $query->limit('1');
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
}