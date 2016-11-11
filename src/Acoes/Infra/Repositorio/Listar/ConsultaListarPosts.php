<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarPosts {
    
    public function consultar($usuarioId, $table){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(id)');
        $query->from($table);
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('A');
    }
}