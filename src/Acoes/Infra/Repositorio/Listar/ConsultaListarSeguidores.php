<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarSeguidores {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('s.usuario_id', 'usuarioId')
                ->add('u.nome')
                ->add('u.endereco');
        $query->from('seguir', 's');
        $query->join('usuario', 'u')
                ->on('u.id = s.usuario_seguir_id');
        $query->where('usuario_seguir_id = ?')
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
        $query->where('usuario_id = ?')
                ->add('ativo = 1')
                ->add('confirmar_seguir = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('A');
    }
}