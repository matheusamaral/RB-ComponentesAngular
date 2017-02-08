<?php
namespace Quickpeek\Local\Infra\Repositorio\Mapa;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSugestaoLocal {
    
    public function consultarCheckIn($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localTitulo')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('l.ativo', 'checkIn')
                ->add('c.id', 'checkInId')
                ->add('c.visibilidade_id', 'visibilidadeId')
                ->add('case when c.automatico = 1 and c.confirmado = 0 then 1 else 0 end', 'cancelarCheckIn');
        $query->from('local', 'l');
        $query->join('check_in', 'c')
                ->on('c.usuario_id = ?')
                ->on('c.local_id = l.id')
                ->on('c.presente = 1')
                ->on('c.ativo = 1');
        $query->where('l.ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
    
    public function consultarCasaTrabalho($usuarioId, $latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('casa')
                ->add('trabalho')
                ->add('(6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude_casa)) * COS(RADIANS(?) '
                        . '- RADIANS(longitude_casa)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude_casa))))', 'distanciaCasa')
                ->add('(6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude_trabalho)) * COS(RADIANS(?) '
                        . '- RADIANS(longitude_trabalho)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude_trabalho))))', 'distanciaTrabalho');
        $query->from('casa_trabalho');
        $query->where('usuario_id = ?')
                ->add('ativo = 1')
                ->add('(casa = 1 or trabalho = 1)');
        $query->addVariaveis([$latitude, $longitude, $latitude,
                $latitude, $longitude, $latitude, $usuarioId]);
        return $query->executar('A');
    }
    
    public function consultarSugestao($usuarioId, $latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.id', 'localId')
                ->add('l.titulo', 'localTitulo')
                ->add('l.latitude', 'latitude')
                ->add('l.longitude', 'longitude')
                ->add('ifnull(c.presente, 0)', 'checkIn')
                ->add('(6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) * COS(RADIANS(?) '
                        . '- RADIANS(l.longitude)) + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude))))', 'distancia');
        $query->from('local', 'l');
        $query->join('check_in', 'c', 'left')
                ->on('c.local_id = l.id')
                ->on('c.usuario_id = ?')
                ->on('c.presente = 0')
                ->on('case when c.automatico = 1 then c.confirmado = 1 end')
                ->on('c.ativo = 1');
        $query->where('(6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(l.latitude)) * COS(RADIANS(?) '
                . '- RADIANS(l.longitude)) + SIN(RADIANS(?)) * SIN(RADIANS(l.latitude)))) <= 0.03');
        $query->group('l.id');
        $query->order('count(c.id) desc, distancia, c.id desc, localId');
        $query->limit('1');
        $query->addVariaveis([$latitude, $longitude, $latitude, $usuarioId, $latitude, $longitude, $latitude]);
        return $query->executar('A');
    }
    
    public function consultarDistancia($usuarioId, $latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('casa_trabalho');
        $query->where('((6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude_casa)) * COS(RADIANS(?) '
                . '- RADIANS(longitude_casa)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude_casa)))) <= 0.03) or ((6371 * ACOS(COS(RADIANS(?)) '
                . '* COS(RADIANS(latitude_trabalho)) * COS(RADIANS(?) - RADIANS(longitude_trabalho)) + SIN(RADIANS(?)) * SIN(RADIANS'
                . '(latitude_trabalho)))) <= 0.03)')
                ->add('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$latitude, $longitude, $latitude,
                $latitude, $longitude, $latitude, $usuarioId]);
        return $query->executar('{id}');
    }
    
    public function consultarDistanciaCasaTrabalho($usuarioId, $latitude, $longitude){
        
        $query = Conteiner::get('Query', false);
        $query->select('case when ((6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude_trabalho)) * COS(RADIANS(?) '
                . '- RADIANS(longitude_trabalho)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude_trabalho)))) <= 0.03) then 2 '
                . 'else 1 end', 'local')
                ->add('latitude_casa', 'latitudeCasa')
                ->add('latitude_trabalho', 'latitudeTrabalho')
                ->add('longitude_casa', 'longitudeCasa')
                ->add('longitude_trabalho', 'longitudeTrabalho');
        $query->from($this->subCasaTrabalho(), 'ct');
        $query->where('(((6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude_casa)) * COS(RADIANS(?) '
                . '- RADIANS(longitude_casa)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude_casa)))) <= 0.03) or ((6371 * ACOS(COS(RADIANS(?)) '
                . '* COS(RADIANS(latitude_trabalho)) * COS(RADIANS(?) - RADIANS(longitude_trabalho)) + SIN(RADIANS(?)) * SIN(RADIANS'
                . '(latitude_trabalho)))) <= 0.03))')
                ->add('usuario_id = ?');
        $query->order('id', 'desc');
        $query->limit(1);
        $query->addVariaveis([$latitude, $longitude, $latitude,
                $usuarioId, $latitude, $longitude, $latitude,
                $latitude, $longitude, $latitude, $usuarioId]);
        return $query->executar('A');
    }
    
    private function subCasaTrabalho(){
        
        $query = Conteiner::get('Query', false);
        $query->select('*');
        $query->from('casa_trabalho');
        $query->where('usuario_id = ?')
                ->add('ativo = 0');
        $query->order('id', 'desc');
        $query->limit(1);
        return $query;
    }
}