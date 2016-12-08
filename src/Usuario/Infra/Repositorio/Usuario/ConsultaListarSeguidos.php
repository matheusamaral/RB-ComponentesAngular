<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarSeguidos {
    
    public function consultar($usuarioSessao, $usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('u.nome', 'nome')
                ->add('u.endereco', 'endereco')
                ->add('ifnull(se.ativo, 0)', 'seguindo');
        $query->from('seguir', 's');
        $query->join('usuario', 'u')
                ->on('u.id = s.usuario_seguir_id')
                ->on('u.ativo = 1');
        $query->join('seguir', 'se', 'left')
                ->on('se.usuario_id = ?')
                ->on('se.usuario_seguir_id = s.usuario_seguir_id')
                ->on('se.confirmar_seguir = 1');
        $query->where('s.usuario_id = ?')
                ->add('s.ativo = 1')
                ->add('s.confirmar_seguir = 1');
        $query->order('s.momento_confirmar_seguir', 'desc');
        $query->addVariaveis([$usuarioSessao, $usuarioId]);
        return $query->executar();
    }
}
