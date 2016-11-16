<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class MensagensExcluidas extends Persistente{
        private $id = false;
        private $ativo = false;
        private $momento = false;
        private $usuarioId = false;
        private $mensagensId = false; 
                
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
            
        public function getMensagensId() {
            if(!$this->mensagensId)
                    $this->mensagensId = new Mensagens(); 
            return $this->mensagensId;
        }

        public function setMensagensId($mensagensId) {
            if($mensagensId instanceof Mensagens)
                $this->mensagensId = $mensagensId;
            else $this->getMensagensId()->setId($mensagensId);
        }
        
    }