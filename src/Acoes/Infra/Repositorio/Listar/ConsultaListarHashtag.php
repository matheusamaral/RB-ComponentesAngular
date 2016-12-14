<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarHashtag {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('ch.id', 'categoriaId')
                ->add('ch.titulo', 'categoriaTitulo')
                ->add('ch.endereco', 'categoriaEndereco')
                ->add('h.id', 'hashtagId')
                ->add('h.titulo', 'hashtagTitulo');
        $query->from('hashtag_categoria', 'hc');
        $query->join('hashtag', 'h')
                ->on('h.id = hc.hashtag_id');
        $query->join('categoria_hashtag', 'ch')
                ->on('ch.id = hc.categoria_hashtag_id')
                ->on('hc.ativo = 1');
        $query->join('hashtag_local', 'hl', 'left')
                ->on('hl.hashtag_id = h.id')
                ->on('hl.ativo = 1');
        $query->where('h.ativo = 1')
                ->add('h.visivel = 1');
        $query->group('h.id');
        $query->order('count(distinct hl.id) desc');
        return $query->executar('EA', false, $this->structure());
    }
    
    private function structure(){
        
        return[
            "categoriaId"=>"id",
            "categoriaTitulo"=>"titulo",
            "categoriaEndereco"=>"endereco",
            "hashtags"=>[
                "hashtagId"=>"id",
                "hashtagTitulo"=>"titulo"
            ]
        ];
    }
}