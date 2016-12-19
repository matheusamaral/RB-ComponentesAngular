<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Bloqueado;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaBloqueado {
    
    public function consultar($usuarioId, $usuarioMensagemId, $visibilidadeId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('bloqueado');
        $query->where('usuario_id = ?')
                ->add('usuario_bloqueado_id = ?')
                ->add('visibilidade_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioMensagemId, $usuarioId, $visibilidadeId]);
        
        return $query->executar('{id}');
    }
}