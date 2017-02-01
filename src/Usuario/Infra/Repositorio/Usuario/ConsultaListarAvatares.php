<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarAvatares {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('nome')
                ->add("concat('".DOMINIO_PROJETO."',endereco)",'endereco');
        $query->from('avatares');
        $query->where('ativo = 1');
        return $query->executar();
    }
}