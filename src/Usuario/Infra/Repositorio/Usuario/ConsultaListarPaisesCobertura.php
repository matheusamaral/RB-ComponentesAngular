<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarPaisesCobertura {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('ddi')
                ->add('nome');
        $query->from('ddi_paises');
        $query->where('cobertura = 1');
        return $query->executar();
    }
}