<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Curtir extends Persistente{
        private $id = false;
        private $usuarioId = false;
        private $midiaId = false;
        private $hashtagId = false;
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
            
        public function getMidiaId() {
            if(!$this->midiaId)
                    $this->midiaId = new Midia(); 
            return $this->midiaId;
        }

        public function setMidiaId($midiaId) {
            if($midiaId instanceof Midia)
                $this->midiaId = $midiaId;
            else $this->getMidiaId()->setId($midiaId);
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