<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class HashtagLocal extends Persistente{
        private $id = false;
        private $usuarioId = false;
        private $localId = false;
        private $hashtagId = false;
        private $categoriaHashtagId = false;
        private $visibilidadeId = false;
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
                    $this->localId = new \Quickpeek\Local\Dominio\Local(); 
            return $this->localId;
        }

        public function setLocalId($localId) {
            if($localId instanceof \Quickpeek\Local\Dominio\Local)
                $this->localId = $localId;
            else $this->getLocalId()->setId($localId);
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