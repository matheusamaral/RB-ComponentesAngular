<?php
namespace Quickpeek\Local\Infra\Repositorio\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaMapa {
    
    public function consultar($usuarioId, $latitude, $longitude, $tempoHashtag, $tempoMidia){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localNome')
                ->add('l.endereco', 'localEndereco')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude))))', 'distancia')
                ->add('(count(distinct c.id) * 1) + ((count(distinct m.id) + count(distinct hl.id)) * 0.9) + (count(distinct ci.id) * 0.8) * case
        when (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) <= 10 then 0.6
        when (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) <= 20 then 0.5
        when (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) <= 40 then 0.3
		else 7/(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude))))
    end ', 'relevancia')
                ->add('(count(distinct cin.id))', 'relevancia2')
                ->add('sub.hashtag_id', 'hashtagId')
                ->add('sub.countHash')
                ->add('ch.id', 'categoriaId')
                ->add('l.foto', 'fotoLocal')
                ->add('ch.endereco', 'categoriaHashtagFoto')
                ->add('cl.endereco', 'categoriaLocalFoto');
        $query->from('local', 'l');
        $query->join('check_in', 'c')->on('c.local_id = l.id')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->join('midia', 'm', 'left')->on('m.local_id = l.id')
                ->on('m.momento > date_add(now(), interval - ? hour)')
                ->on('m.ativo = 1');
        $query->join('hashtag_local', 'hl', 'left')->on('hl.local_id = l.id')
                ->on('hl.momento > date_add(now(), interval - ? hour)')
                ->on('hl.ativo = 1');
        $query->join('check_in', 'ci', 'left')->on('ci.usuario_id = ?')
                ->on('ci.local_id = l.id')
                ->on('ci.presente = 0')
                ->on('ci.ativo = 1');
        $query->join('seguir', 's', 'left')->on('s.usuario_id = ?')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('check_in', 'cin', 'left')->on('cin.usuario_id = s.usuario_seguir_id')
                ->on('cin.local_id = l.id')
                ->on('cin.presente = 1')
                ->on('cin.ativo = 1');
        $query->join($this->sub(), 'sub', 'left')->on('sub.local_id = l.id');
        $query->join('hashtag_categoria', 'hc', 'left')->on('hc.hashtag_id = sub.hashtag_id')
                ->on('hc.ativo = 1');
        $query->join('categoria_hashtag', 'ch', 'left')->on('ch.id = hc.categoria_hashtag_id')
                ->on('ch.ativo = 1');
        $query->join('local_categoria', 'lc', 'left')
                ->on('lc.local_id = l.id')
                ->on('lc.ativo = 1');
        $query->join('categoria_local', 'cl', 'left')
                ->on('cl.id = lc.categoria_id')
                ->on('cl.ativo = 1');
        $query->where('l.ativo = 1');
        $query->group('l.id');
        $query->order('relevancia desc, relevancia2 desc');
        $query->limit(50);
        $query->addVariaveis([$latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude,
            $tempoMidia, $tempoHashtag, $usuarioId, $usuarioId, $tempoHashtag]);
        return $query->executar();
    }
    
    private function sub(){
        
        $query = Conteiner::get('Query', false);
        $query->select('sub2.*');
        $query->from('local', 'l');
        $query->join($this->sub2(), 'sub2')->on('sub2.local_id = l.id');
        $query->group('l.id');
        return $query;
    }
    
    private function sub2(){
        
        $query = Conteiner::get('Query', false);
        $query->select('hashtag_id')
                ->add('local_id')
                ->add('count(distinct id)', 'countHash');
        $query->from('hashtag_local');
        $query->where('momento > date_add(now(), interval -? hour)');
        $query->group('local_id, hashtag_id');
        $query->order('count(distinct id)', 'desc');
        return $query;
    }
}
