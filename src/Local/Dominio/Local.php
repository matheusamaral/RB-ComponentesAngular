<?php
        
namespace Quickpeek\Local\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Local extends Persistente{
        private $id = false;
        private $latitude = false;
        private $longitude = false;
        private $titulo = false;
        private $usuarioId = false;
        private $categoriaLocalId = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getLatitude() {
            return $this->latitude;
        }

        public function setLatitude($latitude) {
            $this->latitude = $latitude;
        } 
                
        public function getLongitude() {
            return $this->longitude;
        }

        public function setLongitude($longitude) {
            $this->longitude = $longitude;
        } 
                
        public function getTitulo() {
            return $this->titulo;
        }

        public function setTitulo($titulo) {
            $this->titulo = $titulo;
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
            
        public function getCategoriaLocalId() {
            if(!$this->categoriaLocalId)
                    $this->categoriaLocalId = new CategoriaLocal(); 
            return $this->categoriaLocalId;
        }

        public function setCategoriaLocalId($categoriaLocalId) {
            if($categoriaLocalId instanceof CategoriaLocal)
                $this->categoriaLocalId = $categoriaLocalId;
            else $this->getCategoriaLocalId()->setId($categoriaLocalId);
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