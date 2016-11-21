<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaHashtag {
    
    public function consultar($usuarioId, $localId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('h.id', 'hashtagId')
                ->add('h.titulo', 'hashtagTitulo')
                ->add('count(distinct hl.id)', 'hashtagQtd')
                ->add('ch.titulo', 'categoriaTitulo')
                ->add('ih.endereco', 'categoriaEndereco')
                ->add('case when hlo.id is null then 0 else 1 end', 'hashtag');
        $query->from('hashtag', 'h');
        $query->join('local', 'l')->on('l.ativo = 1');
        $query->join('hashtag_local', 'hl')->on('hl.local_id = l.id')
                ->on('hl.hashtag_id = h.id')
                ->on('hl.ativo = 1');
        $query->join('hashtag_local', 'hlo', 'left')->on('hlo.usuario_id = ?')
                ->on('hlo.hashtag_id = h.id')
                ->on('hlo.ativo = 1');
        $query->where('h.ativo = 1')
                ->add('l.id = ?')
                ->add('h.momento > date_add(now(), INTERVAL -? HOUR)');
        $query->join('categoria_hashtag', 'ch', 'left')->on('ch.ativo = 1');
        $query->join('hashtag_categoria', 'hc')->on('hc.hashtag_id = h.id')
                ->on('hc.categoria_hashtag_id = ch.id')
                ->on('hc.ativo = 1');
        $query->join('icone_hashtag', 'ih')->on('ih.id = ch.icone_hashtag_id');
        $query->group('h.id');
        $query->order('hashtagQtd desc');
        $query->addVariaveis([$usuarioId, $localId, $tempo]);
        return $query->executar();
    }
}
