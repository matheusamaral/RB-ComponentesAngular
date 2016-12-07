<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class RespostasVisualizadas extends Persistente{
        private $id = false;
        private $ativo = false;
        private $momento = false;
        private $usuarioId = false;
        private $respostasId = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getAtivo() {
            return $this->ativo;
        }

        public function setAtivo($ativo) {
            $this->ativo = $ativo;
        } 
                
        public function getMomento() {
            return $this->momento;
        }

        public function setMomento($momento) {
            $this->momento = $momento;
        } 
            
        public function getUsuarioId() {
            if(!$this->usuarioId)
                    $this->usuarioId = new \Quickpeek\Usuario\Dominio\Usuario(); 
            return $this->usuarioId;
        }

        public function setUsuarioId($usuarioId) {
            if($usuarioId instanceof \Quickpeek\Usuario\Dominio\Usuario)
                $this->usuarioId = $usuarioId;
            else $this->getUsuarioId()->setId($usuarioId);
        } 
            
        public function getRespostasId() {
            if(!$this->respostasId)
                    $this->respostasId = new Respostas(); 
            return $this->respostasId;
        }

        public function setRespostasId($respostasId) {
            if($respostasId instanceof Respostas)
                $this->respostasId = $respostasId;
            else $this->getRespostasId()->setId($respostasId);
        }
        
    }