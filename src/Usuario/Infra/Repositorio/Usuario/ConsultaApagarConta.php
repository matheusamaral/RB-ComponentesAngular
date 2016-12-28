<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaApagarConta {
    
    public function consultar($usuarioId, $telefone){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('usuario');
        $query->where('id = ?')
                ->add('telefone = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $telefone]);
        return $query->executar('{id}');
    }
}
