<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class DdiPaises extends Persistente{
        private $id = false;
        private $ddi = false;
        private $nome = false;
        private $cobertura = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getDdi() {
            return $this->ddi;
        }

        public function setDdi($ddi) {
            $this->ddi = $ddi;
        } 
                
        public function getNome() {
            return $this->nome;
        }

        public function setNome($nome) {
            $this->nome = $nome;
        } 
                
        public function getCobertura() {
            return $this->cobertura;
        }

        public function setCobertura($cobertura) {
            $this->cobertura = $cobertura;
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