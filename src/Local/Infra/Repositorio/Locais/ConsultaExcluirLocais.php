<?php
namespace Quickpeek\Local\Infra\Repositorio\Locais;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaExcluirLocais {
    
    public function consultar($momento){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id');
        $query->from('local', 'l');
        $query->join('hashtag_local', 'hl', 'left')
                ->on('hl.local_id = l.id')
                ->on('hl.momento > date_add(now(), interval -? hour)')
                ->on('hl.ativo = 1');
        $query->join('midia', 'm', 'left')
                ->on('m.local_id = l.id')
                ->on('m.momento > date_add(now(), interval -? hour)')
                ->on('m.ativo = 1');
        $query->join('perguntas', 'p', 'left')
                ->on('p.local_id = l.id')
                ->on('p.momento > date_add(now(), interval -? hour)')
                ->on('p.ativo = 1');
        $query->join('midia', 'mi', 'left')
                ->on('mi.local_id = l.id')
                ->on('mi.ativo = 1');
        $query->join('curtir', 'c', 'left')
                ->on('c.midia_id = mi.id')
                ->on('c.momento > date_add(now(), interval -? hour)')
                ->on('c.ativo = 1');
        $query->join('check_in', 'ci', 'left')
                ->on('ci.local_id = l.id')
                ->on('ci.momento > date_add(now(), interval -? hour)')
                ->on('ci.ativo = 1');
        $query->where('ifnull(hl.ativo, ifnull(m.ativo, ifnull(p.ativo, ifnull(c.ativo, ifnull(ci.ativo, null))))) is null')
                ->add('l.usuario_id is not null')
                ->add('l.ativo = 1');
        $query->addVariaveis([$momento, $momento, $momento, $momento, $momento]);
        return $query->executar('AA1', false, 'id');
    }
}
