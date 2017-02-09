<?php
namespace Quickpeek\Usuario\Infra\Repositorio\DesligarGps;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDesligarGps {
    
    public function consultarCheckInId($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('check_in');
        $query->where('usuario_id = ?')
                ->add('presente = 1')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{id}');
    }
    
    public function consultarCasaTrabalhoId($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('casa_trabalho');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{id}');
    }
}