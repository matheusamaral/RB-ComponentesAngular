<?php
namespace Quickpeek\Local\Infra\Repositorio\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSugestaoLocal {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localTitulo');
    }
}