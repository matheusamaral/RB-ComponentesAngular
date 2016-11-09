<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Bloqueado;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarBloqueados {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('usuario_bloqueado_id', 'usuarioBloqueadoId')
                ->add('anonimo');
        $query->from('bloqueado');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar();
    }
}