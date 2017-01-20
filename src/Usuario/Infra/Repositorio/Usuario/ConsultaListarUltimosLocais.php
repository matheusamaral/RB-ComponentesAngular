<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarUltimosLocais {
    
    public function consultar($usuarioId, $latitude, $longitude, $presente){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localNome')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('timestampdiff(minute, ci.momento, now())', 'minutos')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) 
                    * cos(radians(?) - radians(l.longitude)) 
                    + sin(radians(?)) * sin(radians(l.latitude))))', 'distancia')
                ->add('ci.visibilidade_id', 'visibilidadeCheckInId');
        $query->from('local', 'l');
        $query->join('check_in', 'ci')
                ->on('ci.local_id = l.id')
                ->on('ci.usuario_id = ?')
                ->on('ci.visibilidade_id != 3')
                ->on('ci.presente = ' . $presente)
                ->on('ci.ativo = 1');
        $query->where('l.ativo = 1');
        $query->order('ci.momento desc');
        $query->limit(10);
        $query->addVariaveis([$latitude, $longitude, $latitude, $usuarioId]);
        return $query->executar();
    }
    
    public function consultarComVisibilidade($usuarioSessaoId, $usuarioId, $latitude, $longitude, $presente){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localNome')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('timestampdiff(minute, ci.momento, now())', 'minutos')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) 
                    * cos(radians(?) - radians(l.longitude)) 
                    + sin(radians(?)) * sin(radians(l.latitude))))', 'distancia')
                ->add('ci.visibilidade_id', 'visibilidadeCheckInId');
        $query->from('local', 'l');
        $query->join('check_in', 'ci')
                ->on('ci.local_id = l.id')
                ->on('ci.usuario_id = ?')
                ->on('ci.presente = ' . $presente)
                ->on('ci.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = ?')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->where('l.ativo = 1')
                ->add('case when ci.visibilidade_id = 1 then 1 '
                        . 'when ci.visibilidade_id = 2 and s.id is not null then 1 '
                        . 'else 0 end = 1');
        $query->order('ci.momento desc');
        $query->limit(10);
        $query->addVariaveis([$latitude, $longitude, $latitude, $usuarioId, $usuarioSessaoId, $usuarioId]);
        return $query->executar();
    }
    
    public function consultarCasaTrabalho($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('case when casa = 1 then 1 '
                . 'when trabalho = 1 then 2 end', 'local');
        $query->from('casa_trabalho');
        $query->where('usuario_id = ?')
                ->add('(casa = 1 or trabalho = 1)')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('local');
    }
}
