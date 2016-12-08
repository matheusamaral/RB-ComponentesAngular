<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaMidia {
    
    public function consultar($localId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('m.id')
                ->add('m.endereco', 'endereco')
                ->add('m.momento', 'momento');
        $query->from('midia', 'm');
        $query->join('curtir', 'c', 'left')->on('c.midia_id = m.id')
                ->on('c.ativo = 1');
        $query->where('m.local_id = ?')
                ->add('m.momento > date_add(now(), INTERVAL -? HOUR)')
                ->add('m.ativo = 1');
        $query->group('m.id order by count(distinct c.id) desc limit 3');
        $query->addVariaveis([$localId, $tempo]);
        return $query->executar();
    }
    
    public function consultarQtd($localId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(id)', 'qtd');
        $query->from('midia');
        $query->where('local_id = ?')
                ->add('momento > date_add(now(), INTERVAL -? HOUR)')
                ->add('ativo = 1');
        $query->addVariaveis([$localId, $tempo]);
        return $query->executar('A');
    }
}
