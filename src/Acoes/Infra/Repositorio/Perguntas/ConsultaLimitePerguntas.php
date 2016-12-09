<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaLimitePerguntas {
    
    public function consultar($usuarioId, $localId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('momento');
        $query->from('perguntas');
        $query->where('date_add(now(), INTERVAL -? HOUR) < momento')
                ->add('usuario_id = ?')
                ->add('local_id = ?')
                ->add('ativo = 1');
        $query->order('momento');
        $query->addVariaveis([$tempo, $usuarioId, $localId]);
        return $query->executar();
    }
}