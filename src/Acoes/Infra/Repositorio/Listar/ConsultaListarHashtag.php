<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarHashtag {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('ch.id', 'categoriaId')
                ->add('ch.titulo', 'categoriaTitulo')
                ->add('h.id', 'hashtagId')
                ->add('h.titulo', 'hashtagTitulo');
        $query->from('hashtag_categoria', 'hc');
        $query->join('hashtag', 'h')->on('h.id = hc.hashtag_id')
                ->add('categoria_hashtag', 'ch')->on('ch.id = hc.categoria_hashtag_id');
        $query->where('hc.ativo = 1')
                ->add('h.ativo = 1');
        return $query->executar('EA', false, $this->structure());
    }
    
    private function structure(){
        
        return[
            "categoriaId"=>"id",
            "categoriaTitulo"=>"titulo",
            "hashtags"=>[
                "hashtagId"=>"id",
                "hashtagTitulo"=>"titulo"
            ]
        ];
    }
}