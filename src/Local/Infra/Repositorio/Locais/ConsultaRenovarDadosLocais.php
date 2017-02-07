<?php
namespace Quickpeek\Local\Infra\Repositorio\Locais;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaRenovarDadosLocais {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('lg.place_id', 'placeId');
        $query->from('local_google', 'lg');
        $query->join('local', 'l')
                ->on('l.momento < date_add(now(), interval -25 day)')
                ->on('l.id = lg.local_id')
                ->on('l.usuario_id is null')
                ->on('l.ativo = 1');
        $query->where('lg.ativo = 1');
        return $query->executar();
    }
}