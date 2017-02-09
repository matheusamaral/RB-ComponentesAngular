<?php
namespace Quickpeek\Local\Infra\Repositorio\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaMapa {
    
    public function consultar($usuarioId, $latitude, $longitude, $tempoHashtag, $tempoMidia, $notIn){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localNome')
                ->add('l.endereco', 'localEndereco')
                ->add('ifnull(chec.ativo, 0)', 'checkIn')
                ->add('chec.visibilidade_id', 'visibilidadeCheckIn')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) '
                        . '* sin(radians(l.latitude))))', 'distancia')
                ->add('((count(distinct c.id) * 1) + ((ifnull(m.contagem, 0) + ifnull(hl.contagem, 0)) * 0.9) + (count(distinct ci.id) * 0.8)) 
                    * (case when (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) 
                    * sin(radians(l.latitude)))) <= 40 then 21/case when (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - 
                    radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) = 0 then 0.01 else 
                    (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude))))
                    end else 7/(6371 * acos(cos(radians(?)) * cos(radians(
                    l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) end)', 'relevancia')
                ->add('(count(distinct cin.id))', 'relevancia2')
                ->add('l.foto', 'fotoLocal');
        $query->from('local', 'l');
        $query->join('check_in', 'c')
                ->on('c.local_id = l.id')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->join('check_in', 'chec', 'left')
                ->on('chec.usuario_id = ?')
                ->on('chec.local_id = l.id')
                ->on('chec.ativo = 1')
                ->on('chec.presente = 1');
        $query->join($this->subMidia(), 'm', 'left')
                ->on('m.local_id = l.id');
        $query->join($this->subHashtag(), 'hl', 'left')
                ->on('hl.local_id = l.id');
        $query->join('check_in', 'ci', 'left')
                ->on('ci.usuario_id = ?')
                ->on('ci.local_id = l.id')
                ->on('ci.presente = 0')
                ->on('ci.ativo = 1');
        $query->join($this->subCheckIn(), 'cin', 'left')
                ->on('cin.local_id = l.id');
        $query->where('l.ativo = 1')
                ->add('l.id not in(' . $notIn . ')')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) '
                        . '+ sin(radians(?)) * sin(radians(l.latitude)))) <= 5');
        $query->group('l.id');
        $query->order('distancia, relevancia desc, relevancia2 desc');
        $query->limit(50);
        $query->addVariaveis([ 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $usuarioId, $tempoHashtag, $tempoMidia, 
            $usuarioId, $usuarioId,
            $latitude, $longitude, $latitude]);
        return $query->executar();
    }
    
    private function subHashtag(){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(local_id)', 'contagem')
                ->add('local_id');
        $query->from('hashtag_local');
        $query->where('momento > date_add(now(), interval -? hour)')
                ->add('ativo = 1');
        $query->group('local_id');
        return $query;
    }
    private function subMidia(){
        
        $query = Conteiner::get('Query', false);
        $query->select('count(local_id)', 'contagem')
                ->add('local_id');
        $query->from('midia');
        $query->where('momento > date_add(now(), interval -? hour)')
                ->add('ativo = 1');
        $query->group('local_id');
        return $query;
    }
    
    private function subCheckIn(){
        
        $query = Conteiner::get('Query', false);
        $query->select('cin.id')
                ->add('cin.local_id');
        $query->from('seguir', 's');
        $query->join('check_in', 'cin')
                ->on('cin.usuario_id = s.usuario_seguir_id')
                ->on('cin.presente = 1')
                ->on('cin.ativo = 1');
        $query->where('s.usuario_id = ?')
                ->add('s.confirmar_seguir = 1')
                ->add('s.ativo = 1');
        $query->group('cin.local_id');
        return $query;
    }
    
    public function consultaFoto($locaisId, $tempoHashtag, $usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('sub.*')
                ->add('l.id', 'localId')
                ->add("case when ch.id != 10 then concat('" . DOMINIO_PROJETO . "',ch.endereco) "
                        . 'when u.ativo = 0 then ' . "'" . DOMINIO_PROJETO . "/ui/imagens/avatares/96.svg' "
                        . 'when sub.visibilidade_id = 1 then u.endereco '
                        . 'when sub.visibilidade_id = 2 and s.id is not null then u.endereco '
                        . "when sub.usuario_id = $usuarioId and sub.visibilidade_id != 3 then u.endereco "
                        . "else concat('" . DOMINIO_PROJETO . "',a.endereco) end", 'categoriaHashtagFoto')
                ->add("concat('" . DOMINIO_PROJETO . "',cl.endereco)", 'categoriaLocalFoto');
        $query->from('local', 'l');
        $query->join($this->subHashtagLocal($locaisId), 'sub', 'left')
                ->on('sub.local_id = l.id');
        $query->join('categoria_hashtag', 'ch', 'left')
                ->on('ch.id = sub.categoria_hashtag_id')
                ->on('ch.ativo = 1');
        $query->join('local_categoria', 'lc', 'left')
                ->on('lc.local_id = l.id')
                ->on('lc.ativo = 1');
        $query->join('categoria_local', 'cl', 'left')
                ->on('cl.id = lc.categoria_id')
                ->on('cl.ativo = 1');
        $query->join('usuario', 'u', 'left')
                ->on('u.id = sub.usuario_id');
        $query->join('avatares', 'a', 'left')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->where('l.ativo = 1')
                ->add('l.id in(' . $locaisId . ')');
        $query->group('l.id');
        $query->order('sub.countHash');
        $query->addVariaveis([$tempoHashtag, $usuarioId]);
        return $query->executar();
    }
    
    private function subHashtagLocal($locaisId){
        
        $query = Conteiner::get('Query', false);
        $query->select('hashtag_id')
                ->add('local_id')
                ->add('visibilidade_id')
                ->add('usuario_id')
                ->add('categoria_hashtag_id')
                ->add('count(distinct id)', 'countHash');
        $query->from('hashtag_local');
        $query->where('momento > date_add(now(), interval -? hour)')
                ->add('local_id in (' . $locaisId . ')');
        $query->group('local_id, hashtag_id');
        $query->order('countHash desc');
        $query->limit(1);
        return $query;
    }
}
