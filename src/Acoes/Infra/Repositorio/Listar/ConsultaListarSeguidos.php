<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarSeguidos {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('s.usuario_seguir_id', 'usuarioSeguirId')
                ->add('u.nome')
                ->add('u.endereco');
        $query->from('seguir', 's');
        $query->join('usuario', 'u')
                ->on('u.id = s.usuario_id');
        $query->where('s.usuario_id = ?')
                ->add('s.ativo = 1')
                ->add('u.ativo = 1')
                ->add('s.confirmar_seguir = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar();
    }
    
    public function consultarQtd($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(id)', 'qtd');
        $query->from('seguir');
        $query->where('usuario_seguir_id = ?')
                ->add('ativo = 1')
                ->add('confirmar_seguir = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('A');
    }
}