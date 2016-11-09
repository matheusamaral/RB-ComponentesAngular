<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Bloqueado;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDesbloquear {
    
    public function consultar($usuarioId, $usuarioBloqId, $anonimo){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('bloqueado');
        $query->where('usuario_id = ?')
                ->add('usuario_bloqueado_id = ?')
                ->add('anonimo = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioBloqId, $anonimo]);
        return $query->executar('A');
    }
}