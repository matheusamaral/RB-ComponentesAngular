<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class SmsCodigo extends Persistente{
        private $id = false;
        private $ativo = false;
        private $momento = false;
        private $codigo = false;
        private $telefone = false;
        private $confirmado = false;
        private $editando = false;
        private $statusSmsId = false;
        private $usuarioId = false; 
                
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
                
        public function getCodigo() {
            return $this->codigo;
        }

        public function setCodigo($codigo) {
            $this->codigo = $codigo;
        } 
                
        public function getTelefone() {
            return $this->telefone;
        }

        public function setTelefone($telefone) {
            $this->telefone = $telefone;
        } 
                
        public function getConfirmado() {
            return $this->confirmado;
        }

        public function setConfirmado($confirmado) {
            $this->confirmado = $confirmado;
        } 
                
        public function getEditando() {
            return $this->editando;
        }

        public function setEditando($editando) {
            $this->editando = $editando;
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
        
    }