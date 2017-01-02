<?php
        
namespace Quickpeek\Local\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Local extends Persistente{
        private $id = false;
        private $latitude = false;
        private $longitude = false;
        private $titulo = false;
        private $usuarioId = false;
        private $ativo = false;
        private $momento = false;
        private $endereco = false;
        private $cidade = false;
        private $estado = false;
        private $pais = false;
        private $foto = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getLatitude() {
            return $this->latitude;
        }

        public function setLatitude($latitude) {
            $this->latitude = $latitude;
        } 
                
        public function getLongitude() {
            return $this->longitude;
        }

        public function setLongitude($longitude) {
            $this->longitude = $longitude;
        } 
                
        public function getTitulo() {
            return $this->titulo;
        }

        public function setTitulo($titulo) {
            $this->titulo = $titulo;
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
                
        public function getEndereco() {
            return $this->endereco;
        }

        public function setEndereco($endereco) {
            $this->endereco = $endereco;
        } 
                
        public function getCidade() {
            return $this->cidade;
        }

        public function setCidade($cidade) {
            $this->cidade = $cidade;
        } 
                
        public function getEstado() {
            return $this->estado;
        }

        public function setEstado($estado) {
            $this->estado = $estado;
        } 
                
        public function getPais() {
            return $this->pais;
        }

        public function setPais($pais) {
            $this->pais = $pais;
        } 
                
        public function getFoto() {
            return $this->foto;
        }

        public function setFoto($foto) {
            $this->foto = $foto;
        }
        
    }