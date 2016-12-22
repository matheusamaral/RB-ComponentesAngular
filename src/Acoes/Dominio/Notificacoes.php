<?php
        
namespace Quickpeek\Acoes\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Notificacoes extends Persistente{
        private $id = false;
        private $usuarioId = false;
        private $usuarioAcaoId = false;
        private $tipoId = false;
        private $respostaId = false;
        private $hashtagLocalId = false;
        private $midiaId = false;
        private $visualizado = false;
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
            
        public function getUsuarioAcaoId() {
            if(!$this->usuarioAcaoId)
                    $this->usuarioAcaoId = new \Quickpeek\Usuario\Dominio\Usuario(); 
            return $this->usuarioAcaoId;
        }

        public function setUsuarioAcaoId($usuarioAcaoId) {
            if($usuarioAcaoId instanceof \Quickpeek\Usuario\Dominio\Usuario)
                $this->usuarioAcaoId = $usuarioAcaoId;
            else $this->getUsuarioAcaoId()->setId($usuarioAcaoId);
        } 
            
        public function getTipoId() {
            if(!$this->tipoId)
                    $this->tipoId = new TipoNotificacoes(); 
            return $this->tipoId;
        }

        public function setTipoId($tipoId) {
            if($tipoId instanceof TipoNotificacoes)
                $this->tipoId = $tipoId;
            else $this->getTipoId()->setId($tipoId);
        } 
            
        public function getRespostaId() {
            if(!$this->respostaId)
                    $this->respostaId = new Respostas(); 
            return $this->respostaId;
        }

        public function setRespostaId($respostaId) {
            if($respostaId instanceof Respostas)
                $this->respostaId = $respostaId;
            else $this->getRespostaId()->setId($respostaId);
        } 
            
        public function getHashtagLocalId() {
            if(!$this->hashtagLocalId)
                    $this->hashtagLocalId = new HashtagLocal(); 
            return $this->hashtagLocalId;
        }

        public function setHashtagLocalId($hashtagLocalId) {
            if($hashtagLocalId instanceof HashtagLocal)
                $this->hashtagLocalId = $hashtagLocalId;
            else $this->getHashtagLocalId()->setId($hashtagLocalId);
        } 
            
        public function getMidiaId() {
            if(!$this->midiaId)
                    $this->midiaId = new Midia(); 
            return $this->midiaId;
        }

        public function setMidiaId($midiaId) {
            if($midiaId instanceof Midia)
                $this->midiaId = $midiaId;
            else $this->getMidiaId()->setId($midiaId);
        } 
                
        public function getVisualizado() {
            return $this->visualizado;
        }

        public function setVisualizado($visualizado) {
            $this->visualizado = $visualizado;
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