<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Mensagens extends Persistente{
        private $id = false;
        private $titulo = false;
        private $ativo = false;
        private $momento = false;
        private $momentoVisualizado = false;
        private $endereco = false;
        private $usuarioId = false;
        private $usuarioMensagemId = false;
        private $statusMensagemId = false; 
                
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
                
        public function getMomentoVisualizado() {
            return $this->momentoVisualizado;
        }

        public function setMomentoVisualizado($momentoVisualizado) {
            $this->momentoVisualizado = $momentoVisualizado;
        } 
                
        public function getEndereco() {
            return $this->endereco;
        }

        public function setEndereco($endereco) {
            $this->endereco = $endereco;
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
            
        public function getUsuarioMensagemId() {
            if(!$this->usuarioMensagemId)
                    $this->usuarioMensagemId = new Usuario(); 
            return $this->usuarioMensagemId;
        }

        public function setUsuarioMensagemId($usuarioMensagemId) {
            if($usuarioMensagemId instanceof Usuario)
                $this->usuarioMensagemId = $usuarioMensagemId;
            else $this->getUsuarioMensagemId()->setId($usuarioMensagemId);
        } 
            
        public function getStatusMensagemId() {
            if(!$this->statusMensagemId)
                    $this->statusMensagemId = new StatusMensagem(); 
            return $this->statusMensagemId;
        }

        public function setStatusMensagemId($statusMensagemId) {
            if($statusMensagemId instanceof StatusMensagem)
                $this->statusMensagemId = $statusMensagemId;
            else $this->getStatusMensagemId()->setId($statusMensagemId);
        }
        
    }