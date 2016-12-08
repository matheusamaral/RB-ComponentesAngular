<?php
        
namespace Quickpeek\Local\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class LocalGoogle extends Persistente{
        private $id = false;
        private $placeId = false;
        private $localId = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getPlaceId() {
            return $this->placeId;
        }

        public function setPlaceId($placeId) {
            $this->placeId = $placeId;
        } 
            
        public function getLocalId() {
            if(!$this->localId)
                    $this->localId = new Local(); 
            return $this->localId;
        }

        public function setLocalId($localId) {
            if($localId instanceof Local)
                $this->localId = $localId;
            else $this->getLocalId()->setId($localId);
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
        
    }