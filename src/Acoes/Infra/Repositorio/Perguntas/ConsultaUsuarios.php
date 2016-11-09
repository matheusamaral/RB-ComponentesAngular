<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaUsuarios {
    
    public function consultar($localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('usuario_id', 'usuarioId');
        $query->from('check_in');
        $query->where('local_id = ?')
                ->add('presente = 1')
                ->add('ativo = 1');
        $query->addVariaveis([$localId]);
        return $query->executar();
    }
}