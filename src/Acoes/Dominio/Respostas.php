<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Respostas extends Persistente{
        private $id = false;
        private $titulo = false;
        private $ativo = false;
        private $momento = false;
        private $usuarioId = false;
        private $perguntasId = false; 
                
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
        
    }