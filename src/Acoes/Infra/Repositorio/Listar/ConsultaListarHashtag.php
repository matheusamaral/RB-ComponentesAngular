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
        $query->from('hashtag', 'h');
        $query->join('hashtag_categoria', 'hc')
                ->on('hc.hashtag_id = h.id')
                ->on('hc.visivel = 1')
                ->on('hc.ativo = 1');
        $query->join('categoria_hashtag', 'ch')
                ->on('ch.id = hc.categoria_hashtag_id')
                ->on('ch.ativo = 1');
        $query->join($this->hashtagLocal(), 'hl', 'left')
                ->on('hl.hashtag_id = h.id');
        $query->where('h.ativo = 1')
                ->add('h.visivel = 1');
        $query->group('h.id');
        $query->order('hl.contagem desc');
        return $query->executar('EA', false, $this->structure());
    }
    
    private function hashtagLocal(){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(distinct id)', 'contagem')
                ->add('hashtag_id');
        $query->from('hashtag_local');
        $query->where('ativo = 1');
        return $query;
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