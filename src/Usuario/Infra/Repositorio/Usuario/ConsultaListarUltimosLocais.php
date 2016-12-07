<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarUltimosLocais {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localNome')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('ci.presente', 'presente')
                ->add('timestampdiff(minute, ci.momento, now())', 'minutos');
        $query->from('check_in', 'ci');
        $query->join('local', 'l', 'left')->on('l.id = ci.local_id')
                ->on('l.ativo = 1');
        $query->where('ci.usuario_id = ?')->add('ci.ativo = 1');
        $query->order('ci.presente desc, ci.momento desc');
        $query->limit('11');
        $query->addVariaveis([$usuarioId]);
        return $query->executar();
    }
}
