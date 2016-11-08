<?php
        
namespace Quickpeek\Local\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class CheckIn extends Persistente{
        private $id = false;
        private $usuarioId = false;
        private $localId = false;
        private $visibilidadeId = false;
        private $presente = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
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
            
        public function getVisibilidadeId() {
            if(!$this->visibilidadeId)
                    $this->visibilidadeId = new \Quickpeek\Usuario\Dominio\Visibilidade(); 
            return $this->visibilidadeId;
        }

        public function setVisibilidadeId($visibilidadeId) {
            if($visibilidadeId instanceof \Quickpeek\Usuario\Dominio\Visibilidade)
                $this->visibilidadeId = $visibilidadeId;
            else $this->getVisibilidadeId()->setId($visibilidadeId);
        } 
                
        public function getPresente() {
            return $this->presente;
        }

        public function setPresente($presente) {
            $this->presente = $presente;
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