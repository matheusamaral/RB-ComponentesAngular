<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarUltimosLocais {
    
    public function consultar($usuarioId, $latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localNome')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('ci.presente', 'presente')
                ->add('l.cidade', 'cidade')
                ->add('timestampdiff(minute, ci.momento, now())', 'minutos')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) 
                    * cos(radians(?) - radians(l.longitude)) 
                    + sin(radians(?)) * sin(radians(l.latitude))))', 'distancia');
        $query->from('local', 'l');
        $query->join('check_in', 'ci')
                ->on('ci.local_id = l.id')
                ->on('ci.usuario_id = ?')
                ->on('ci.ativo = 1');
        $query->where('l.ativo = 1');
        $query->order('ci.presente desc, ci.momento desc');
        $query->limit(11);
        $query->addVariaveis([$latitude, $longitude, $latitude, $usuarioId]);
        return $query->executar();
    }
}
