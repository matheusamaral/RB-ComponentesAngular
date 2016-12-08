<?php
namespace Quickpeek\Local\Infra\Repositorio\LocaisPertos;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaLocalGoogle {
    
    public function consultar($placeId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('local_google');
        $query->where('place_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$placeId]);
        return $query->executar('{id}');
    }
}
