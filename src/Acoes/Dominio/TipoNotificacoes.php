<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class TipoNotificacoes extends Persistente{
        private $id = false;
        private $nome = false;
        private $ativo = false;
        private $momento = false; 
                
        public function getId() {
            return $this->id;
        }

        public function setId($id) {
            $this->id = $id;
        } 
                
        public function getNome() {
            return $this->nome;
        }

        public function setNome($nome) {
            $this->nome = $nome;
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