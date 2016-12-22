<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaHashtag {
    
    public function consultar($hashtag){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('hashtag');
        $query->where('titulo = ?')
                ->add('ativo = 1');
        $query->group('titulo');
        $query->addVariaveis([$hashtag]);
        return $query->executar('{id}');
    }
}