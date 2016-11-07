<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Midia extends Persistente{
        private $id = false;
        private $usuarioId = false;
        private $localId = false;
        private $endereco = false;
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
                
        public function getEndereco() {
            return $this->endereco;
        }

        public function setEndereco($endereco) {
            $this->endereco = $endereco;
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