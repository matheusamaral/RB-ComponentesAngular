<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaUsuarioPergunta {
    
    public function consultar($perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('p.usuario_id');
        $query->from('perguntas', 'p');
        $query->join('pergunta_excluida', 'pe', 'left')
                ->on('pe.perguntas_id = p.id')
                ->on('pe.usuario_id = p.usuario_id')
                ->on('pe.ativo = 1');
        $query->where('p.id = ?')
                ->add('pe.id is null')
                ->add('p.ativo = 1');
        $query->addVariaveis($perguntaId);
        return $query->executar('{usuario_id}');
    }
}