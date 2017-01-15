<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVerificarNumero {
    
    public function consultar($numero, $usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('usuario');
        $query->where('id = ?')
                ->add('telefone = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $numero]);
        return $query->executar('{id}');
    }
    
    public function consultarNumero($numero){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('usuario');
        $query->where('telefone = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$numero]);
        return $query->executar('{id}');
    }
}