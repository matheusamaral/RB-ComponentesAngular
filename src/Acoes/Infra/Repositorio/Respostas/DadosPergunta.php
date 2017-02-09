<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class DadosPergunta {
    
    public function consultar($perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.titulo', 'localNome')
                ->add('p.usuario_id', 'usuarioId');
        $query->from('local', 'l');
        $query->join('perguntas', 'p')
                ->on('p.local_id = l.id')
                ->on('p.id = ?')
                ->on('p.ativo = 1');
        $query->where('l.ativo = 1');
        $query->addVariaveis($perguntaId);
        return $query->executar('A');
    }
}