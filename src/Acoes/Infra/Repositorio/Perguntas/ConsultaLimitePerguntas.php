<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaLimitePerguntas {
    
    public function consultar($usuarioId, $localId, $tempoLimitePerguntas){
        
        $query = Conteiner::get('Query', false);
        $query->select('momento');
        $query->from('perguntas');
        $query->where('usuario_id = ?')
                ->add('local_id = ?')
                ->add('date_add(now(), INTERVAL -? HOUR) < momento')
                ->add('ativo = 1');
        $query->order('id');
        $query->addVariaveis([$usuarioId, $localId, $tempoLimitePerguntas]);
        return $query->executar('AA1', false, 'momento');
    }
}