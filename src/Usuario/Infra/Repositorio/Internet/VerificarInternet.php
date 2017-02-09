<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Internet;
use Rubeus\ContenerDependencia\Conteiner;

class VerificarInternet {
    
    public function consultarExistente($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('usuario_online');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{id}');
    }
}