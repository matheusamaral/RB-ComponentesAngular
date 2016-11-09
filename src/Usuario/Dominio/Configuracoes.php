<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Configuracoes extends Persistente{
        private $id = false;
        private $ativo = false;
        private $momento = false;
        private $notificacaoPresenca = false;
        private $notificacaoPublicacao = false;
        private $padraoAprovacao = false;
        private $contato = false;
        private $usuarioId = false;
        private $visibilidadeId = false; 
                
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
                
        public function getNotificacaoPresenca() {
            return $this->notificacaoPresenca;
        }

        public function setNotificacaoPresenca($notificacaoPresenca) {
            $this->notificacaoPresenca = $notificacaoPresenca;
        } 
                
        public function getNotificacaoPublicacao() {
            return $this->notificacaoPublicacao;
        }

        public function setNotificacaoPublicacao($notificacaoPublicacao) {
            $this->notificacaoPublicacao = $notificacaoPublicacao;
        } 
                
        public function getPadraoAprovacao() {
            return $this->padraoAprovacao;
        }

        public function setPadraoAprovacao($padraoAprovacao) {
            $this->padraoAprovacao = $padraoAprovacao;
        } 
                
        public function getContato() {
            return $this->contato;
        }

        public function setContato($contato) {
            $this->contato = $contato;
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
            
        public function getVisibilidadeId() {
            if(!$this->visibilidadeId)
                    $this->visibilidadeId = new Visibilidade(); 
            return $this->visibilidadeId;
        }

        public function setVisibilidadeId($visibilidadeId) {
            if($visibilidadeId instanceof Visibilidade)
                $this->visibilidadeId = $visibilidadeId;
            else $this->getVisibilidadeId()->setId($visibilidadeId);
        }
        
    }