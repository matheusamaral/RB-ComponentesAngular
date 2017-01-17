<?php
namespace Quickpeek\Acoes\Infra\Repositorio\CheckIn;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaExcluirCheckIn {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('check_in');
        $query->where('usuario_id = ?')
                ->add('ativo = 1')
                ->add('presente = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('{id}');
    }
    
    public function consultarCasaTrabalho($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('casa_trabalho');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{id}');
    }
}
