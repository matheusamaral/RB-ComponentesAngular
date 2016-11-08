<?php
        
namespace Quickpeek\Local\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class CategoriaLocal extends Persistente{
        private $id = false;
        private $titulo = false;
        private $ativo = false;
        private $momento = false;
        private $iconeLocalId = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getTitulo() {
            return $this->titulo;
        }

        public function setTitulo($titulo) {
            $this->titulo = $titulo;
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
            
        public function getIconeLocalId() {
            if(!$this->iconeLocalId)
                    $this->iconeLocalId = new IconeLocal(); 
            return $this->iconeLocalId;
        }

        public function setIconeLocalId($iconeLocalId) {
            if($iconeLocalId instanceof IconeLocal)
                $this->iconeLocalId = $iconeLocalId;
            else $this->getIconeLocalId()->setId($iconeLocalId);
        }
        
    }