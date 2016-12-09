<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Bloqueado;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDesbloquear {
    
    public function consultar($usuarioId, $usuarioBloqId, $visibilidadeId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('bloqueado');
        $query->where('usuario_id = ?')
                ->add('usuario_bloqueado_id = ?')
                ->add('visibilidade_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioBloqId, $visibilidadeId]);
        return $query->executar('A');
    }
}