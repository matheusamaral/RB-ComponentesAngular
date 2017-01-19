<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class HashtagCategoria extends Persistente{
        private $id = false;
        private $categoriaHashtagId = false;
        private $hashtagId = false;
        private $visivel = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
            
        public function getCategoriaHashtagId() {
            if(!$this->categoriaHashtagId)
                    $this->categoriaHashtagId = new CategoriaHashtag(); 
            return $this->categoriaHashtagId;
        }

        public function setCategoriaHashtagId($categoriaHashtagId) {
            if($categoriaHashtagId instanceof CategoriaHashtag)
                $this->categoriaHashtagId = $categoriaHashtagId;
            else $this->getCategoriaHashtagId()->setId($categoriaHashtagId);
        } 
            
        public function getHashtagId() {
            if(!$this->hashtagId)
                    $this->hashtagId = new Hashtag(); 
            return $this->hashtagId;
        }

        public function setHashtagId($hashtagId) {
            if($hashtagId instanceof Hashtag)
                $this->hashtagId = $hashtagId;
            else $this->getHashtagId()->setId($hashtagId);
        } 
                
        public function getVisivel() {
            return $this->visivel;
        }

        public function setVisivel($visivel) {
            $this->visivel = $visivel;
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