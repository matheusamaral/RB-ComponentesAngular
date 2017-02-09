<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaHashtag {
    
    public function consultar($usuarioId, $localId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('h.id', 'hashtagId')
                ->add('h.titulo', 'hashtagTitulo')
                ->add('hl.countHash', 'hashtagQtd')
                ->add('ch.id', 'categoriaId')
                ->add("case when ch.id != 10 then concat('" . DOMINIO_PROJETO . "', ch.endereco) "
                        . 'when u.ativo = 0 then ' . "'" . DOMINIO_PROJETO . "/ui/imagens/avatares/96.svg' "
                        . 'when hl.visibilidade_id = 1 then u.endereco '
                        . 'when hl.visibilidade_id = 2 and s.id is not null then u.endereco '
                        . "when hl.usuario_id = $usuarioId and hl.visibilidade_id != 3 then u.endereco "
                        . "else concat('" . DOMINIO_PROJETO . "',a.endereco) end", 'categoriaEndereco')
                ->add('case when hlo.id is null then 0 else 1 end', 'jaCurtiu');
        $query->from('hashtag', 'h');
        $query->join($this->subHashtagLocal(), 'hl')
                ->on('hl.hashtag_id = h.id');
        $query->join('hashtag_local', 'hlo', 'left')
                ->on('hlo.usuario_id = ?')
                ->on('hlo.hashtag_id = h.id')
                ->on('hlo.ativo = 1');
        $query->join('categoria_hashtag', 'ch')
                ->on('ch.id = hl.categoria_hashtag_id')
                ->on('ch.ativo = 1');
        $query->join('usuario', 'u')
                ->on('u.id = hl.usuario_id');
        $query->join('avatares', 'a')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->where('h.ativo = 1');
        $query->order('hl.countHash desc, hl.id');
        $query->addVariaveis([$tempo, $localId, $localId, $usuarioId]);
        return $query->executar();
    }
    
    private function subHashtagLocal(){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('hashtag_id')
                ->add('local_id')
                ->add('visibilidade_id')
                ->add('usuario_id')
                ->add('categoria_hashtag_id')
                ->add('ativo')
                ->add('count(distinct id)', 'countHash');
        $query->from('hashtag_local');
        $query->where('momento > date_add(now(), interval -? hour)')
                ->add('local_id = ?')
                ->add('ativo = 1');
        $query->group('hashtag_id');
        $query->order('countHash desc, id');
        return $query;
    }
}
