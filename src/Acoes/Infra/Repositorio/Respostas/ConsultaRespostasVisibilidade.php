<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaRespostasVisibilidade {
    
    public function consultar($usuarioId, $perguntasId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('respostas_visibilidade');
        $query->where('usuario_id = ?')
                ->add('perguntas_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $perguntasId]);
        return $query->executar('{id}');
    }
}