<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class RespostasVisibilidade extends Persistente{
        private $id = false;
        private $usuarioId = false;
        private $perguntasId = false;
        private $visibilidadeId = false;
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
            
        public function getVisibilidadeId() {
            if(!$this->visibilidadeId)
                    $this->visibilidadeId = new \Quickpeek\Usuario\Dominio\VisibilidadeMensagens(); 
            return $this->visibilidadeId;
        }

        public function setVisibilidadeId($visibilidadeId) {
            if($visibilidadeId instanceof \Quickpeek\Usuario\Dominio\VisibilidadeMensagens)
                $this->visibilidadeId = $visibilidadeId;
            else $this->getVisibilidadeId()->setId($visibilidadeId);
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