<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaUsuariosConfirmarSeguir {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('s.id', 'seguirId')
                ->add('u.id', 'usuarioId')
                ->add('u.nome', 'nome')
                ->add('u.endereco', 'endereco')
                ->add('s.momento', 'seguirMomento');
        $query->from('usuario', 'u');
        $query->join('seguir', 's')
                ->on('s.usuario_id = u.id')
                ->on('s.usuario_seguir_id = ?')
                ->on('s.confirmar_seguir = 0')
                ->on('s.ativo = 1');
        $query->where('u.ativo = 1');
        $query->order('s.id', 'desc');
        $query->addVariaveis($usuarioId);
        return $query->executar();
    }
}