<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaPosicaoLocal {
    
    public function consultar($localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('latitude')
                ->add('longitude');
        $query->from('local');
        $query->where('id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$localId]);
        return $query->executar('A');
    }
}
