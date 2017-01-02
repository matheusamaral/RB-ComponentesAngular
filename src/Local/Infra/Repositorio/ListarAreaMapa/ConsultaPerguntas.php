<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaPerguntas {
    
    public function consultarQtd($localId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(distinct id)', 'qtd');
        $query->from('perguntas');
        $query->where('local_id = ?')
                ->add('momento > date_add(now(), INTERVAL -? HOUR)')
                ->add('ativo = 1');
        $query->addVariaveis([$localId, $tempo]);
        return $query->executar('{qtd}');
    }
}
