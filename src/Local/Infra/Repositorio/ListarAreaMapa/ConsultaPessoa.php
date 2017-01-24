<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaPessoa {
    
public function consultar($usuarioId, $localId, $midiaTempo, $hashtagTempo, $limit, $notIn){
        
        $query = Conteiner::get('Query', false);
        
        $query->select('distinct u.id', 'usuarioId')
                ->add('u.nome', 'usuarioNome')
                ->add('c.visibilidade_id', 'visibilidade')
                ->add('case when c.visibilidade_id = 1 then u.endereco'
                        . ' when c.visibilidade_id = 2 and s.id is not null then u.endereco'
                        . ' else a.endereco end', 'endereco')
                ->add('c.visibilidade_id', 'visibilidadeId')
                ->add('c.local_id', 'localId')
                ->add('ifnull(s.ativo, 0) + ((count(distinct cu.id) + consulta.soma) * 0.8)'
                        . ' + (count(distinct ci.id) * 0.7)', 'count')
                ->add('count(distinct cur.id) * 0.2 + (count(distinct se.id) * 0.1)', 'count2')
                ->add('timestampdiff(minute, c.momento, now())', 'minutos')
                ->add('case when s.confirmar_seguir = 1 then 1'
                        . ' when s.confirmar_seguir = 0 then 2'
                        . ' else 0 end', 'seguindo')
                ->add('s.id', 'seguirId');
        $query->from('usuario', 'u');
        $query->join('local', 'l')
                ->on('l.id = ?')
                ->on('l.ativo = 1');
        $query->join('check_in', 'c')
                ->on('c.usuario_id = u.id')
                ->on('c.local_id = l.id')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.ativo = 1');
        $query->join('avatares', 'a', 'left')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('midia', 'm', 'left')
                ->on('m.usuario_id = u.id')
                ->on('m.local_id = l.id')
                ->on('m.ativo = 1')
                ->on('m.momento > date_add(now(), INTERVAL -? HOUR)');
        $query->join('curtir', 'cu', 'left')
                ->on('cu.midia_id = m.id')
                ->on('cu.ativo = 1');
        $query->join('seguir', 'se', 'left')
                ->on('se.usuario_seguir_id = u.id')
                ->on('se.confirmar_seguir = 1')
                ->on('se.ativo = 1');
        $query->join('check_in', 'ci', 'left')
                ->on('ci.usuario_id = u.id')
                ->on('ci.local_id = l.id')
                ->on('ci.ativo = 1');
        $query->join('midia', 'mi', 'left')
                ->on('mi.usuario_id = u.id')
                ->on('mi.ativo = 1');
        $query->join('curtir', 'cur',' left')
                ->on('cur.midia_id = mi.id')
                ->on('cur.ativo = 1');
        $query->join('hashtag_local', 'hl', 'left')
                ->on('hl.usuario_id = u.id')
                ->on('hl.ativo = 1');
        $query->join($this->query1(), 'consulta', 'left')
                ->on('consulta.id = u.id');
        $query->where('u.id not in (' . $notIn .')');
        $query->group('u.id');
        $query->order('count desc, count2 desc');
        $query->limit($limit);
        $query->addVariaveis([$localId, $usuarioId, $midiaTempo, $localId, $hashtagTempo, $localId, $hashtagTempo]);
        return $query->executar();
    }
    
    private function query1(){
        $query1 = Conteiner::get('Query', false);
        $query1->select('sum(t.countHashtag)', 'soma')
                ->add('user.hashtag_id')
                ->add('user.id');
        $query1->from($this->query2(), 'user');
        $query1->join($this->query3(), 't', 'left')
                ->on('t.hashtag_id = user.hashtag_id');
        $query1->group('user.id');
        return $query1;
    }
    
    private function query2(){
        $query2 = Conteiner::get('Query', false);
        $query2->select('u.id')
                ->add('hl.hashtag_id');
        $query2->from('usuario', 'u');
        $query2->join('hashtag_local', 'hl', 'left')->on('hl.usuario_id = u.id')
                ->on('hl.local_id = ?')
                ->on('hl.momento > date_add(now(), INTERVAL -? HOUR)')
                ->on('hl.ativo = 1');
        $query2->group('u.id, hl.hashtag_id');
        return $query2;
    }
    
    private function query3(){
        $query3 = Conteiner::get('Query', false);
        $query3->select('count(hl.id)', 'countHashtag')
                ->add('hl.hashtag_id');
        $query3->from('hashtag_local', 'hl');
        $query3->where('hl.local_id = ?')
                ->add('hl.momento > date_add(now(), INTERVAL -? HOUR)')
                ->add('hl.ativo = 1');
        $query3->group('hl.hashtag_id');
        return $query3;
    }
    
    public function consultarQtd($localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(distinct id)', 'qtd');
        $query->from('check_in');
        $query->where('local_id = ?')
                ->add('presente = 1')
                ->add('ativo = 1');
        $query->addVariaveis($localId);
        return $query->executar('{qtd}');
    }
}
