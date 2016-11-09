<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDeixarSeguir {
    
    public function consultar($usuarioId, $usuarioSeguindo){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('seguir');
        $query->where('usuario_id = ?')
                ->add('usuario_seguir_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioSeguindo]);
        return $query->executar('A');
    }
}
