<?php
namespace Quickpeek\Local\Infra\Repositorio\ConfiguracoesQuickpeek;
use Rubeus\ContenerDependencia\Conteiner;

class Consultar {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('titulo')
                ->add('tempo');
        $query->from('configuracoes_quickpeek');
        $array = $query->executar();
        
        foreach($array as $v){
          $arrayNovo[$v['titulo']] = $v['tempo'];
        }
        
        return $arrayNovo;
    }
}
