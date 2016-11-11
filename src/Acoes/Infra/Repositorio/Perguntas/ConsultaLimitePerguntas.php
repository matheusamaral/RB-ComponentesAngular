<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaLimitePerguntas {
    
    public function consultar($usuarioId, $localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('perguntas');
        $query->where('date_add(now(), INTERVAL -3 HOUR) < momento')
                ->add('usuario_id = ?')
                ->add('local_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $localId]);
        return $query->executar();
    }
}