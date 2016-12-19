<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSeguirId {
    
    public function consultar($usuarioSessaoId, $usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('seguir');
        $query->where('usuario_id = ?')
                ->add('usuario_seguir_id = ?')
                ->add('confirmar_seguir = 0')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioSessaoId]);
        return $query->executar('{id}');
    }
}