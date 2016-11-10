<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaHashtag {
    
    public function consultar($catHash, $hashId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('hashtag_categoria');
        $query->where('categoria_hashtag_id = ?')
                ->add('hashtag_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$catHash, $hashId]);
        return $query->executar('A');
    }
}