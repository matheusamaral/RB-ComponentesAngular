<?php
namespace Quickpeek\Acoes\Infra\Repositorio\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaCasaTrabalho {
    
    public function consultarId($usuarioId){
        
        $query = Conteiner::get('Query');
        $query->select('id');
        $query->from('casa_trabalho');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{id}');
    }
}