<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarHashtag {
    
    public function consultar($categoriaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('hc.id', '');
        $query->from();
        $query->join()->on();
        $query->where();
        $query->addVariaveis([$categoriaId]);
        return $query->executar('EA');
    }
}