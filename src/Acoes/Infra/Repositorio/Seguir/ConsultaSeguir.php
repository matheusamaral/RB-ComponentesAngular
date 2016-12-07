<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSeguir {
    
    public function consultar($usuarioId, $usuarioSeguirId){
        
        $query = Conteiner::get('Query', false);
        $query->select('c.padrao_aprovacao', 'padraoAprovacao')
                ->add('s.id', 'id');
        $query->from('configuracoes', 'c');
        $query->join('seguir', 's', 'left')->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = ?')
                ->on('s.ativo = 1');
        $query->where('c.usuario_id = ?')
                ->add('c.ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioSeguirId, $usuarioSeguirId]);
        return $query->executar('A');
    }
}
