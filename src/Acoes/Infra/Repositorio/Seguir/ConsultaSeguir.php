<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSeguir {
    
    public function consultar($usuarioId, $usuarioSeguindo){
        
        $query = Conteiner::get('Query', false);
        $query->select('cfg.padrao_aprovacao', 'padrao')
                ->add('seg.id', 'id');
        $query->from('configuracoes', 'cfg');
        $query->join('seguir', 'seg', 'left')
                ->on('seg.usuario_id = ?')
                ->on('seg.usuario_seguir_id = ?')
                ->on('seg.ativo = 1');
        $query->where('cfg.usuario_id = ?')
                ->add('cfg.ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioSeguindo, $usuarioId]);
        return $query->executar('A');
    }
}
