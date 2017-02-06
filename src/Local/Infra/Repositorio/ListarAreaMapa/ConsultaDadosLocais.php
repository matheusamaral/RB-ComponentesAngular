<?php
namespace Quickpeek\Local\Infra\Repositorio\ListarAreaMapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDadosLocais {
    
    public function consultar($usuarioId, $latitude, $longitude, $latitudeLocal, $longitudeLocal, $tempoMidia, $tempoHashtag, $tempoLimitePerguntas, $notIn, $localId){
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localNome')
                ->add('l.endereco', 'localEndereco')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('l.cidade', 'cidade')
                ->add('(6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude))))', 'distancia')
                 ->add('((count(distinct c.id) * 1) + ((ifnull(m.contagem, 0) + ifnull(hl.contagem, 0)) * 0.9) + (count(distinct ci.id) * 0.8)) 
                    * (case when (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) 
                    * sin(radians(l.latitude)))) <= 40 then 21/case when (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - 
                    radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) = 0 then 0.01 else 
                    (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude))))
                    end else 7/(6371 * acos(cos(radians(?)) * cos(radians(
                    l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) end)', 'relevancia')
                ->add('cin.contagem', 'relevancia2')
                ->add('ifnull(chec.ativo, 0)', 'checkIn')
                ->add('chec.visibilidade_id', 'visibilidadeCheckIn')
                ->add('case when (6371 * acos(cos(radians(?)) * cos(radians(l.latitude)) * cos(radians(?) - radians(l.longitude)) + sin(radians(?)) * sin(radians(l.latitude)))) < 0.03 then 1 else 0 end', 'publicar')
                ->add('case when count(distinct p.id) > 2 then 0 else 1 end', 'perguntar');
        $query->from('local', 'l');
        $query->join('check_in', 'c')
                ->on('c.local_id = l.id')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->join($this->subHashtag(), 'm', 'left')
                ->on('m.local_id = l.id');
        $query->join($this->subMidia(), 'hl', 'left')
                ->on('hl.local_id = l.id');
        $query->join('check_in', 'ci', 'left')
                ->on('ci.usuario_id = ?')
                ->on('ci.local_id = l.id')
                ->on('ci.presente = 0')
                ->on('ci.ativo = 1');
        $query->join($this->subCheckIn(), 'cin', 'left')
                ->on('cin.local_id = l.id');
        $query->join('check_in', 'chec', 'left')
                ->on('chec.usuario_id = ?')
                ->on('chec.local_id = l.id')
                ->on('chec.presente = 1')
                ->on('chec.ativo = 1');
        $query->join('perguntas', 'p', 'left')
                ->on('p.local_id = l.id')
                ->on('p.usuario_id = ?')
                ->on('p.momento > date_add(now(), interval -? hour)')
                ->on('p.ativo = 1');
        $query->where('l.id not in (' . $notIn . ')');
        $query->group('l.id');
        $query->order('l.id = ' . $localId . ' desc, relevancia desc , relevancia2 desc');
        $query->limit(15);
        $query->addVariaveis([$latitude, $longitude, $latitude,
            $latitudeLocal, $longitudeLocal, $latitudeLocal,
            $latitudeLocal, $longitudeLocal, $latitudeLocal,
            $latitudeLocal, $longitudeLocal, $latitudeLocal,
            $latitudeLocal, $longitudeLocal, $latitudeLocal,
            $latitude, $longitude, $latitude, $tempoMidia, 
            $tempoHashtag, $usuarioId, $usuarioId, $usuarioId, 
            $usuarioId, $tempoLimitePerguntas]);
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
        $query->select('count(distinct cin.id)', 'contagem')
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
}
