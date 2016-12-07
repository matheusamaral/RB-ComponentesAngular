<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class StatusSms extends Persistente{
        private $id = false;
        private $ativo = false;
        private $momento = false;
        private $codigo_mobi = false;
        private $titulo = false; 
                
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
                
        public function getCodigo_mobi() {
            return $this->codigo_mobi;
        }

        public function setCodigo_mobi($codigo_mobi) {
            $this->codigo_mobi = $codigo_mobi;
        } 
                
        public function getTitulo() {
            return $this->titulo;
        }

        public function setTitulo($titulo) {
            $this->titulo = $titulo;
        }
        
    }