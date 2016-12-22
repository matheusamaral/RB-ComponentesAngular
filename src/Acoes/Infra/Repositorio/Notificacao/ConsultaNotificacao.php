<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Notificacao;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaNotificacao {
    
    public function consultarHashtag($usuarioId, $localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('hashtag_local');
        $query->where('usuario_id = ?')
                ->add('local_id = ?');
        $query->addVariaveis([$usuarioId, $localId]);
        return $query->executar();
    }
    
    public function consultarMidia($usuarioId, $localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('midia');
        $query->where('usuario_id = ?')
                ->add('local_id = ?');
        $query->addVariaveis([$usuarioId, $localId]);
        return $query->executar();
    }
}
