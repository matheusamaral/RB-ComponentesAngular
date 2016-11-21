<?php
        
namespace Quickpeek\Local\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class ConfiguracoesQuickpeek extends Persistente{
        private $id = false;
        private $tempoHashtag = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getTempoHashtag() {
            return $this->tempoHashtag;
        }

        public function setTempoHashtag($tempoHashtag) {
            $this->tempoHashtag = $tempoHashtag;
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