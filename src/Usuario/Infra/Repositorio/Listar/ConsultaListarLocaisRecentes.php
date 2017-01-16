<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarLocaisRecentes {
    
    public function consultar($usuarioId, $latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localNome')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('l.cidade', 'cidade')
                ->add('ci.presente', 'checkIn')
                ->add('timestampdiff(minute, ci.momento, now())', 'minutos')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) 
                    * cos(radians(?) - radians(l.longitude)) 
                    + sin(radians(?)) * sin(radians(l.latitude))))', 'distancia');
        $query->from('local', 'l');
        $query->join('check_in', 'ci')
                ->on('ci.local_id = l.id')
                ->on('ci.usuario_id = ?')
                ->on('ci.visibilidade_id != 3')
                ->on('ci.ativo = 1');
        $query->where('l.ativo = 1');
        $query->order('ci.momento desc');
        $query->limit(10);
        $query->addVariaveis([$latitude, $longitude, $latitude, $usuarioId]);
        return $query->executar();
    }
}