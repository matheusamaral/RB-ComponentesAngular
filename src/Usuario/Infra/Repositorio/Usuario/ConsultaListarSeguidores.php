<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarSeguidores {
    
    public function consultar($usuarioSessao, $usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('u.nome', 'nome')
                ->add('u.endereco', 'endereco')
                ->add('case when se.confirmar_seguir = 1 then 1'
                        . ' when se.confirmar_seguir = 0 then 2'
                        . ' else 0 end', 'seguindo', 'seguindo')
                ->add('se.id', 'seguirId');
        $query->from('seguir', 's');
        $query->join('usuario', 'u')
                ->on('u.id = s.usuario_id')
                ->on('u.ativo = 1');
        $query->join('seguir', 'se', 'left')
                ->on('se.usuario_id = ?')
                ->on('se.usuario_seguir_id = u.id')
                ->on('se.ativo = 1');
        $query->where('s.usuario_seguir_id = ?')
                ->add('s.ativo = 1')
                ->add('s.confirmar_seguir = 1');
        $query->order('s.id', 'desc');
        $query->addVariaveis([$usuarioSessao, $usuarioId]);
        return $query->executar();
    }
}