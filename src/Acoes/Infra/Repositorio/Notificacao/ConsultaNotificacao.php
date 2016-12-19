<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Notificacao;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaNotificacao {
    
    public function consultar($usuarioId, $localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('hl.id')
                ->add('p.id')
                ->add('m.id');
        $query->from('hashtag_local', 'hl');
        $query->join('perguntas', 'p', 'left')
                ->on('p.usuario_id = ?')
                ->on('p.local_id = ?');
        $query->join('midia', 'm')
                ->on('m.usuario_id = ?')
                ->on('m.local_id = ?');
        $query->where('hl.usuario_id = ?')
                ->add('hl.local_id = ?');
        $query->addVariaveis([$usuarioId, $localId, 
            $usuarioId, $localId, 
            $usuarioId, $localId]);
        return $query->executar();
    }
}
