<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Bloqueado;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarBloqueados {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('case when b.visibilidade_id = 1 then u.nome else a.nome end', 'nome')
                ->add("case when b.visibilidade_id = 1 then u.endereco else concat('" . DOMINIO_PROJETO . "',a.endereco end", 'endereco')
                ->add('b.visibilidade_id', 'visibilidadeId');
        $query->from('bloqueado', 'b');
        $query->join('usuario', 'u')
                ->on('u.id = b.usuario_bloqueado_id')
                ->on('u.ativo = 1');
        $query->join('avatares', 'a')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->where('b.usuario_id = ?')
                ->add('b.ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar();
    }
}
