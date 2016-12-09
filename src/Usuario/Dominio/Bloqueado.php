<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Bloqueado extends Persistente{
        private $id = false;
        private $ativo = false;
        private $momento = false;
        private $visibilidadeId = false;
        private $usuarioId = false;
        private $usuarioBloqueadoId = false; 
                
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
            
        public function getVisibilidadeId() {
            if(!$this->visibilidadeId)
                    $this->visibilidadeId = new VisibilidadeMensagens(); 
            return $this->visibilidadeId;
        }

        public function setVisibilidadeId($visibilidadeId) {
            if($visibilidadeId instanceof VisibilidadeMensagens)
                $this->visibilidadeId = $visibilidadeId;
            else $this->getVisibilidadeId()->setId($visibilidadeId);
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
            
        public function getUsuarioBloqueadoId() {
            if(!$this->usuarioBloqueadoId)
                    $this->usuarioBloqueadoId = new Usuario(); 
            return $this->usuarioBloqueadoId;
        }

        public function setUsuarioBloqueadoId($usuarioBloqueadoId) {
            if($usuarioBloqueadoId instanceof Usuario)
                $this->usuarioBloqueadoId = $usuarioBloqueadoId;
            else $this->getUsuarioBloqueadoId()->setId($usuarioBloqueadoId);
        }
        
    }