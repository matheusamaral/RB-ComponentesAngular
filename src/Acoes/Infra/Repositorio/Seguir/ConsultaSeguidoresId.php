<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSeguidoresId {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId');
        $query->from('usuario', 'u');
        $query->join('configuracoes', 'c')
                ->on('c.usuario_id = u.id')
                ->on('c.ativo = 1');
        $query->join('seguir', 's')
                ->on('s.usuario_seguir_id = ?')
                ->on('s.usuario_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->where('u.ativo = 1')
                ->add('c.notificacao_publicacao = 1');
        $query->group('usuarioId');
        $query->addVariaveis($usuarioId);
        return $query->executar('AA1', false, 'usuarioId');
    }
}