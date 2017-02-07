<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Sms extends Persistente{
        private $id = false;
        private $usuarioId = false;
        private $telefone = false;
        private $statusSmsId = false;
        private $momento = false;
        private $ativo = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
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
                
        public function getTelefone() {
            return $this->telefone;
        }

        public function setTelefone($telefone) {
            $this->telefone = $telefone;
        } 
            
        public function getStatusSmsId() {
            if(!$this->statusSmsId)
                    $this->statusSmsId = new StatusSms(); 
            return $this->statusSmsId;
        }

        public function setStatusSmsId($statusSmsId) {
            if($statusSmsId instanceof StatusSms)
                $this->statusSmsId = $statusSmsId;
            else $this->getStatusSmsId()->setId($statusSmsId);
        } 
                
        public function getMomento() {
            return $this->momento;
        }

        public function setMomento($momento) {
            $this->momento = $momento;
        } 
                
        public function getAtivo() {
            return $this->ativo;
        }

        public function setAtivo($ativo) {
            $this->ativo = $ativo;
        }
        
    }