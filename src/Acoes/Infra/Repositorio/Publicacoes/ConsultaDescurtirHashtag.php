<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDescurtirHashtag {
    
    public function consultar($usuarioId, $hashtagId, $localId, $tempoHashtag){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('hashtag_local');
        $query->where('usuario_id = ?')
                ->add('hashtag_id = ?')
                ->add('local_id = ?')
                ->add('momento > date_add(now(), interval -? hour)')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $hashtagId, $localId, $tempoHashtag]);
        return $query->executar('{id}');
    }
}