<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Internet;
use Rubeus\ContenerDependencia\Conteiner;

class VerificarUsuariosInternet {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('c.id', 'checkInId')
                ->add('ct.id', 'casaTrabalhoId');
        $query->from('usuario_online', 'u');
        $query->join('check_in', 'c', 'left')
                ->on('c.usuario_id = u.id')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->join('casa_trabalho', 'ct', 'left')
                ->on('ct.usuario_id = u.id')
                ->on('(ct.casa = 1 or ct.trabalho = 1)')
                ->on('ct.ativo = 1');
        $query->where('u.momento < date_add(now(), interval -123 minute)')
                ->add('u.ativo = 1');
        return $query->executar();
    }
}