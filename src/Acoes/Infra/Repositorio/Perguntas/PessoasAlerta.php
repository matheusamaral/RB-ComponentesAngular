<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class PessoasAlerta {
    
    public function consultar($usuarioId, $localId, $tempoHashtag, $tempoMidia){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct u.id', 'usuarioId')
                ->add('uo.player_id', 'playerId')
                ->add('(CASE WHEN l.ativo IS NOT NULL THEN 6 ELSE 0 END) + 
                    (CASE WHEN ((IFNULL(s.ativo, 0) + ((COUNT(DISTINCT m.id) + IFNULL(consulta.soma, 0)) * 0.8) + 
                    (COUNT(DISTINCT ci.id) * 0.7)) * 0.5) > 5 THEN 5 ELSE ((IFNULL(s.ativo, 0) + ((COUNT(DISTINCT m.id) + 
                    IFNULL(consulta.soma, 0)) * 0.8) + (COUNT(DISTINCT ci.id) * 0.7)) * 0.5) END) + 
                    (CASE WHEN al.ativo IS NULL THEN 3 ELSE 0 END) + 
                    (CASE WHEN r.ativo IS NOT NULL THEN 2 ELSE 0 END)', 'relevancia')
                ->add('c.momento', 'momento');
        $query->from('usuario', 'u');
        $query->join('check_in', 'c')
                ->on('c.usuario_id = u.id')
                ->on('c.local_id = ?')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->join('local', 'l', 'left')
                ->on('l.usuario_id = u.id')
                ->on('l.id = ?')
                ->on('l.ativo = 1');
        $query->join('alertas', 'al', 'left')
                ->on('al.usuario_id = u.id')
                ->on('al.tipo_id = 1')
                ->on('al.local_id = ?')
                ->on('al.momento > date_add(now(), interval -24 hour)')
                ->on('al.ativo = 1');
        $query->join($this->respostas(), 'r', 'left')
                ->on('r.usuario_id = u.id');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id');
        $query->join('avatares', 'a')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('midia', 'm', 'left')
                ->on('m.usuario_id = u.id')
                ->on('m.local_id = ?')
                ->on('m.momento > date_add(now(), interval -? hour)')
                ->on('m.ativo = 1');
        $query->join('check_in', 'ci', 'left')
                ->on('ci.usuario_id = u.id')
                ->on('ci.local_id = ?')
                ->on('ci.ativo = 1');
        $query->join('hashtag_local', 'hl', 'left')
                ->on('hl.usuario_id = u.id')
                ->on('hl.ativo = 1');
        $query->join($this->publicacoes(), 'consulta', 'left')
                ->on('consulta.id = u.id');
        $query->join('usuario_onesignal', 'uo')
                ->on('uo.usuario_id = u.id')
                ->on('uo.ativo = 1');
        $query->group('u.id');
        $query->order('relevancia desc, momento desc');
        $query->limit(100);
        $query->addVariaveis([$localId, $localId, $localId, $localId, $usuarioId, $localId, $tempoMidia, $localId,
                $localId, $tempoHashtag, $localId, $tempoHashtag]);
        return $query->executar();
    }
    
    private function respostas(){
        
        $query = Conteiner::get('Query', false);
        $query->select('r.ativo')
                ->add('r.usuario_id');
        $query->from('respostas', 'r');
        $query->join('perguntas', 'p')
                ->on('p.local_id = ?');
        $query->where('r.perguntas_id = p.id');
        return $query;
    }
    
    private function publicacoes(){
        
        $query = Conteiner::get('Query', false);
        $query->select('sum(t.countHashtag)', 'soma')
                ->add('user.hashtag_id')
                ->add('user.id');
        $query->from($this->user(), 'user', 'left');
        $query->join($this->contagem(), 't', 'left')
                ->on('t.hashtag_id = user.hashtag_id');
        $query->group('user.id');
        return $query;
    }
    
    private function user(){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id')
                ->add('hl.hashtag_id');
        $query->from('usuario', 'u');
        $query->join('hashtag_local', 'hl', 'left')
                ->on('hl.usuario_id = u.id')
                ->on('hl.local_id = ?')
                ->on('hl.momento > date_add(now(), interval -? hour)')
                ->on('hl.ativo = 1');
        $query->group('u.id, hl.hashtag_id');
        return $query;
    }
    
    private function contagem(){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(hl.id)', 'countHashtag')
                ->add('hl.hashtag_id');
        $query->from('hashtag_local', 'hl');
        $query->where('hl.local_id = ?')
                ->add('hl.momento > date_add(now(), interval -? hour)')
                ->add('hl.ativo = 1');
        $query->group('hl.hashtag_id');
        return $query;
    }
}