<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Seguir extends Persistente{
        private $id = false;
        private $ativo = false;
        private $momento = false;
        private $confirmarSeguir = false;
        private $momentoConfirmarSeguir = false;
        private $usuarioId = false;
        private $usuarioSeguirId = false; 
                
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
                
        public function getConfirmarSeguir() {
            return $this->confirmarSeguir;
        }

        public function setConfirmarSeguir($confirmarSeguir) {
            $this->confirmarSeguir = $confirmarSeguir;
        } 
                
        public function getMomentoConfirmarSeguir() {
            return $this->momentoConfirmarSeguir;
        }

        public function setMomentoConfirmarSeguir($momentoConfirmarSeguir) {
            $this->momentoConfirmarSeguir = $momentoConfirmarSeguir;
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
            
        public function getUsuarioSeguirId() {
            if(!$this->usuarioSeguirId)
                    $this->usuarioSeguirId = new Usuario(); 
            return $this->usuarioSeguirId;
        }

        public function setUsuarioSeguirId($usuarioSeguirId) {
            if($usuarioSeguirId instanceof Usuario)
                $this->usuarioSeguirId = $usuarioSeguirId;
            else $this->getUsuarioSeguirId()->setId($usuarioSeguirId);
        }
        
    }