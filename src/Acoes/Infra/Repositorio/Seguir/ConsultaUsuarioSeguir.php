<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaUsuarioSeguir {
    
    public function consultar($seguirId){
        
        $query = Conteiner::get('Query', false);
        $query->select('usuario_id', 'usuarioId')
                ->add('usuario_seguir_id', 'usuarioSeguirId');
        $query->from('seguir');
        $query->where('id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$seguirId]);
        return $query->executar('A');
    }
}
