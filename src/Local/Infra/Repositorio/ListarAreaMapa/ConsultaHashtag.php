<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaHashtag {
    
    public function consultar($usuarioId, $localId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('h.id', 'hashtagId')
                ->add('h.titulo', 'hashtagTitulo')
                ->add('count(distinct hl.id)', 'hashtagQtd')
                ->add('ch.id', 'categoriaId')
                ->add('case when ch.id != 10 then ch.endereco '
                        . 'when u.ativo = 0 then ' . "'" . DOMINIO_PROJETO . "/ui/imagens/avatares/96.svg' "
                        . 'when hl.visibilidade_id = 1 then u.endereco '
                        . 'when hl.visibilidade_id = 2 and s.id is not null then u.endereco '
                        . "when hl.usuario_id = $usuarioId and hl.visibilidade_id != 3 then u.endereco "
                        . "else concat('" . DOMINIO_PROJETO . "',a.endereco end", 'categoriaEndereco')
                ->add('case when hlo.id is null then 0 else 1 end', 'jaCurtiu');
        $query->from('hashtag', 'h');
        $query->join('local', 'l')
                ->on('l.ativo = 1');
        $query->join('hashtag_local', 'hl')
                ->on('hl.local_id = l.id')
                ->on('hl.hashtag_id = h.id')
                ->on('hl.ativo = 1');
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
        $query->where('h.ativo = 1')
                ->add('l.id = ?')
                ->add('hl.momento > date_add(now(), INTERVAL -? HOUR)');
        $query->group('h.id');
        $query->order('hashtagQtd desc, hl.id');
        $query->addVariaveis([$usuarioId, $usuarioId, $localId, $tempo]);
        return $query->executar();
    }
}
