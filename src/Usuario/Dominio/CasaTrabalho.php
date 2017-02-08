<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class CasaTrabalho extends Persistente{
        private $id = false;
        private $latitudeCasa = false;
        private $longitudeCasa = false;
        private $latitudeTrabalho = false;
        private $longitudeTrabalho = false;
        private $desconectado = false;
        private $casa = false;
        private $trabalho = false;
        private $usuarioId = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getLatitudeCasa() {
            return $this->latitudeCasa;
        }

        public function setLatitudeCasa($latitudeCasa) {
            $this->latitudeCasa = $latitudeCasa;
        } 
                
        public function getLongitudeCasa() {
            return $this->longitudeCasa;
        }

        public function setLongitudeCasa($longitudeCasa) {
            $this->longitudeCasa = $longitudeCasa;
        } 
                
        public function getLatitudeTrabalho() {
            return $this->latitudeTrabalho;
        }

        public function setLatitudeTrabalho($latitudeTrabalho) {
            $this->latitudeTrabalho = $latitudeTrabalho;
        } 
                
        public function getLongitudeTrabalho() {
            return $this->longitudeTrabalho;
        }

        public function setLongitudeTrabalho($longitudeTrabalho) {
            $this->longitudeTrabalho = $longitudeTrabalho;
        } 
                
        public function getDesconectado() {
            return $this->desconectado;
        }

        public function setDesconectado($desconectado) {
            $this->desconectado = $desconectado;
        } 
                
        public function getCasa() {
            return $this->casa;
        }

        public function setCasa($casa) {
            $this->casa = $casa;
        } 
                
        public function getTrabalho() {
            return $this->trabalho;
        }

        public function setTrabalho($trabalho) {
            $this->trabalho = $trabalho;
        } 
            
        public function getUsuarioId() {
            if(!$this->usuarioId)
                    $this->usuarioId = new Usuario(); 
            return $this->usuarioId;
        }

        public function setUsuarioId($usuarioId) {
            if($usuarioId instanceof Usuario)
                $this->usuarioId = $usuarioId;
            else $this->getUsuarioId()->setId($usuarioId);
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