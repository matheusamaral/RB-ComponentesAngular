<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarAvatares {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('nome')
                ->add('endereco');
        $query->from('avatares');
        $query->where('ativo = 1');
        return $query->executar();
    }
}