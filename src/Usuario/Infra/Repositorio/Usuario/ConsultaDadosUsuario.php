<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDadosUsuario {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('*');
        $query->from('usuario');
        $query->where('id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('A');
    }
}