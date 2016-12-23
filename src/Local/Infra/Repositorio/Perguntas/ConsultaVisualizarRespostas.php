<?php
namespace Quickpeek\Local\Infra\Repositorio\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVisualizarRespostas {
    
    public function consultar($usuarioId, $respostaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('respostas_visualizadas');
        $query->where('usuario_id = ?')
                ->add('respostas_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $respostaId]);
        return $query->executar('{id}');
    }
}