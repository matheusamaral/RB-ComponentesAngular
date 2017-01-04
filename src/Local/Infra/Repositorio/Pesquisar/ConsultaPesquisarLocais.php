<?php
namespace Quickpeek\Local\Infra\Repositorio\Pesquisar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaPesquisarLocais {
    
    public function consultar($usuarioId, $pesquisa, $latitude, $longitude, $notIn, $tempoHashtag, $tempoMidia){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct l.id', 'localId')
                ->add('l.titulo', 'localTitulo')
                ->add('l.cidade', 'localCidade')
                ->add('l.latitude', 'localLatitude')
                ->add('l.longitude', 'localLongitude')
                ->add('chec.ativo', 'checkIn')
                ->add('(IFNULL(lo.ativo, 0) + IFNULL(cl.ativo, 0) + IFNULL(h.ativo, 0) + case when loc.ativo is not null then 0.5 else 0 end + case when loca.ativo is not null then 0.5 else 0 end)', 'teste')
                ->add('(IFNULL(lo.ativo, 0) + IFNULL(cl.ativo, 0) + IFNULL(h.ativo, 0) + IFNULL(loc.ativo, 0) + IFNULL(loca.ativo, 0)) * ((COUNT(DISTINCT c.id) * 1) + ((COUNT(DISTINCT m.id) + COUNT(DISTINCT hl.id)) * 0.9) + (COUNT(DISTINCT ci.id) * 0.8)) 
                    * CASE WHEN (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) * COS(RADIANS(?) - RADIANS(l.longitude)) 
                    + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude)))) <= 10 THEN 0.6 WHEN (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) 
                    * COS(RADIANS(?) - RADIANS(l.longitude)) + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude)))) <= 20 THEN 0.5 WHEN 
                    (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) * COS(RADIANS(?) - RADIANS(l.longitude)) + SIN(RADIANS(?)) 
                    * SIN(RADIANS(l.latitude)))) <= 40 THEN 0.3 ELSE 7 / (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) 
                    * COS(RADIANS(?) - RADIANS(l.longitude)) + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude)))) END', 'relevancia')
                ->add('(COUNT(DISTINCT cin.id))', 'relevancia2')
                ->add('(6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) '
                        . '* COS(RADIANS(?) - RADIANS(l.longitude)) + SIN(RADIANS(?)) '
                        . '* SIN(RADIANS(l.latitude))))', 'distancia');
        $query->from('local', 'l');
        $query->join('check_in', 'c', 'inner')
                ->on('c.local_id = l.id')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->join('midia', 'm', 'left')
                ->on('m.local_id = l.id')
                ->on('m.momento > date_add(now(), interval -? hour)');
        $query->join('hashtag_local', 'hl', 'left')
                ->on('hl.local_id = l.id')
                ->on('hl.momento > date_add(now(), interval -? hour)')
                ->on('hl.ativo = 1');
        $query->join('check_in', 'ci', 'left')
                ->on('ci.usuario_id = ?')
                ->on('ci.local_id = l.id')
                ->on('ci.presente = 0')
                ->on('ci.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('check_in', 'cin', 'left')
                ->on('cin.usuario_id = s.usuario_seguir_id')
                ->on('cin.local_id = l.id')
                ->on('cin.presente = 1')
                ->on('cin.ativo = 1');
        $query->join('check_in', 'chec', 'left')
                ->on('chec.usuario_id = ?')
                ->on('chec.local_id = l.id')
                ->on('chec.presente = 1')
                ->on('chec.ativo = 1');
        
        $local = $query->condicao();
        $query->join('local', 'lo', 'left')
                ->on('lo.id = l.id')
                ->on('lo.ativo = 1')
                ->on($local);
        foreach($pesquisa as $v){
            $local->like('or', 'lo.titulo', $v);
        }
        $query->join('local_categoria', 'lc', 'left')
                ->on('lc.local_id = l.id')
                ->on('lc.ativo = 1');
        
        $categoriaLocal = $query->condicao();
        $query->join('categoria_local', 'cl', 'left')
                ->on('cl.id = lc.categoria_id')
                ->on('cl.ativo = 1')
                ->on($categoriaLocal);
        foreach($pesquisa as $v){
            $categoriaLocal->like('or', 'cl.titulo', $v, 'cmc');
        }
        
        $hashtag = $query->condicao();
        $query->join('hashtag', 'h', 'left')
                ->on('h.id = hl.hashtag_id')
                ->on('h.ativo = 1')
                ->on($hashtag);
        foreach($pesquisa as $v){
            $hashtag->like('or', 'h.titulo', $v, 'cmc');
        }
        
        $loc = $query->condicao();
        $query->join('local', 'loc', 'left')
                ->on('loc.id = l.id')
                ->on('loc.ativo = 1')
                ->on($loc);
        foreach($pesquisa as $v){
            $loc->like('or', 'loc.cidade', $v, 'cmc');
        }
        
        $loca = $query->condicao();
        $query->join('local', 'loca', 'left')
                ->on('loca.id = l.id')
                ->on('loca.ativo = 1')
                ->on($loca);
        foreach($pesquisa as $v){
            $loca->like('or', 'loca.endereco', $v);
        }
        
        $query->where('l.id not in(' . $notIn . ')')
                ->add('l.ativo = 1')
                ->add('(IFNULL(lo.ativo, 0) + IFNULL(cl.ativo, 0) + IFNULL(h.ativo, 0) + case when loc.ativo is not null then 0.5 else 0 end + case when loca.ativo is not null then 0.5 else 0 end) > 1');
        $query->group('l.id');
        $query->order('relevancia desc, relevancia2 desc');
        $query->limit(15);
        $query->addVariaveis([
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude, 
            $latitude, $longitude, $latitude,
            $latitude, $longitude, $latitude,
            $tempoMidia, $tempoHashtag, $usuarioId, $usuarioId, $usuarioId]);
        return $query->executar();
    }
}