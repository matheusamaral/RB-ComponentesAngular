<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaLocalId {
    
    public function consultar($perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('local_id');
        $query->from('perguntas');
        $query->where('id = ?');
        $query->addVariaveis($perguntaId);
        return $query->executar('{local_id}');
    }
}