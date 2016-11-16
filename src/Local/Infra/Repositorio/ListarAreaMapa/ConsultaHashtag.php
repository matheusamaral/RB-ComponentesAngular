<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaHashtag {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('h.id', 'hashtagId')
                ->add('h.titulo', 'hashtagTitulo')
                ->add('l.id', 'localId')
                ->add('l.titulo', 'localTitulo');
        $query->from('hashtag', 'h');
        $query->join('local', 'l', 'left')
                ->on('l.ativo = 1')
                ->add('hashtag_local', 'hl')
                ->on('hl.local_id = l.id')
                ->on('hl.hashtag_id = h.id')
                ->on('hl.ativo = 1');
        $query->where('h.ativo = 1');
        return $query->executar();
    }
}
