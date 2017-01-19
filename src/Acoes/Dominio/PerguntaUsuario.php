<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class PerguntaUsuario extends Persistente{
        private $id = false;
        private $visualizado = false;
        private $entregue = false;
        private $ativo = false;
        private $momento = false;
        private $usuarioId = false;
        private $perguntasId = false;
        private $momentoVisualizado = false;
        private $visibilidadeId = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getVisualizado() {
            return $this->visualizado;
        }

        public function setVisualizado($visualizado) {
            $this->visualizado = $visualizado;
        } 
                
        public function getEntregue() {
            return $this->entregue;
        }

        public function setEntregue($entregue) {
            $this->entregue = $entregue;
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
                    $this->usuarioId = new \Quickpeek\Usuario\Dominio\Usuario(); 
            return $this->usuarioId;
        }

        public function setUsuarioId($usuarioId) {
            if($usuarioId instanceof \Quickpeek\Usuario\Dominio\Usuario)
                $this->usuarioId = $usuarioId;
            else $this->getUsuarioId()->setId($usuarioId);
        } 
            
        public function getPerguntasId() {
            if(!$this->perguntasId)
                    $this->perguntasId = new Perguntas(); 
            return $this->perguntasId;
        }

        public function setPerguntasId($perguntasId) {
            if($perguntasId instanceof Perguntas)
                $this->perguntasId = $perguntasId;
            else $this->getPerguntasId()->setId($perguntasId);
        } 
                
        public function getMomentoVisualizado() {
            return $this->momentoVisualizado;
        }

        public function setMomentoVisualizado($momentoVisualizado) {
            $this->momentoVisualizado = $momentoVisualizado;
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
        
    }