<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarConfiguracoes {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('visibilidade_id', 'visibilidadeId')
                ->add('visto_ultimo_id', 'vistoUltimoId')
                ->add('count(distinct b.id)', 'bloqueados');
        $query->from('configuracoes', 'c');
        $query->join('bloqueado', 'b', 'left')->on('b.usuario_id = c.usuario_id')
                ->on('b.ativo = 1');
        $query->where('c.usuario_id = ?')
                ->add('c.ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
}