<?php
        
namespace Quickpeek\Local\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class LocalCategoria extends Persistente{
        private $id = false;
        private $localId = false;
        private $categoriaId = false;
        private $endereco = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
            
        public function getLocalId() {
            if(!$this->localId)
                    $this->localId = new Local(); 
            return $this->localId;
        }

        public function setLocalId($localId) {
            if($localId instanceof Local)
                $this->localId = $localId;
            else $this->getLocalId()->setId($localId);
        } 
            
        public function getCategoriaId() {
            if(!$this->categoriaId)
                    $this->categoriaId = new CategoriaLocal(); 
            return $this->categoriaId;
        }

        public function setCategoriaId($categoriaId) {
            if($categoriaId instanceof CategoriaLocal)
                $this->categoriaId = $categoriaId;
            else $this->getCategoriaId()->setId($categoriaId);
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