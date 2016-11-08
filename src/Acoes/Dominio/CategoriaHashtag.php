<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class CategoriaHashtag extends Persistente{
        private $id = false;
        private $titulo = false;
        private $iconeHashtagId = false;
        private $ativo = false;
        private $momento = false; 
                
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
            
        public function getIconeHashtagId() {
            if(!$this->iconeHashtagId)
                    $this->iconeHashtagId = new IconeHashtag(); 
            return $this->iconeHashtagId;
        }

        public function setIconeHashtagId($iconeHashtagId) {
            if($iconeHashtagId instanceof IconeHashtag)
                $this->iconeHashtagId = $iconeHashtagId;
            else $this->getIconeHashtagId()->setId($iconeHashtagId);
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