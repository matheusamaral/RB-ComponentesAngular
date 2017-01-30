<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Alertas extends Persistente{
        private $id = false;
        private $usuarioId = false;
        private $perguntasId = false;
        private $notificacoesId = false;
        private $mensagensId = false;
        private $localId = false;
        private $tipoId = false;
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
                    $this->usuarioId = new Usuario(); 
            return $this->usuarioId;
        }

        public function setUsuarioId($usuarioId) {
            if($usuarioId instanceof Usuario)
                $this->usuarioId = $usuarioId;
            else $this->getUsuarioId()->setId($usuarioId);
        } 
            
        public function getPerguntasId() {
            if(!$this->perguntasId)
                    $this->perguntasId = new \Quickpeek\Acoes\Dominio\Perguntas(); 
            return $this->perguntasId;
        }

        public function setPerguntasId($perguntasId) {
            if($perguntasId instanceof \Quickpeek\Acoes\Dominio\Perguntas)
                $this->perguntasId = $perguntasId;
            else $this->getPerguntasId()->setId($perguntasId);
        } 
            
        public function getNotificacoesId() {
            if(!$this->notificacoesId)
                    $this->notificacoesId = new \Quickpeek\Acoes\Dominio\Notificacoes(); 
            return $this->notificacoesId;
        }

        public function setNotificacoesId($notificacoesId) {
            if($notificacoesId instanceof \Quickpeek\Acoes\Dominio\Notificacoes)
                $this->notificacoesId = $notificacoesId;
            else $this->getNotificacoesId()->setId($notificacoesId);
        } 
            
        public function getMensagensId() {
            if(!$this->mensagensId)
                    $this->mensagensId = new Mensagens(); 
            return $this->mensagensId;
        }

        public function setMensagensId($mensagensId) {
            if($mensagensId instanceof Mensagens)
                $this->mensagensId = $mensagensId;
            else $this->getMensagensId()->setId($mensagensId);
        } 
            
        public function getLocalId() {
            if(!$this->localId)
                    $this->localId = new \Quickpeek\Local\Dominio\Local(); 
            return $this->localId;
        }

        public function setLocalId($localId) {
            if($localId instanceof \Quickpeek\Local\Dominio\Local)
                $this->localId = $localId;
            else $this->getLocalId()->setId($localId);
        } 
            
        public function getTipoId() {
            if(!$this->tipoId)
                    $this->tipoId = new TipoAlertas(); 
            return $this->tipoId;
        }

        public function setTipoId($tipoId) {
            if($tipoId instanceof TipoAlertas)
                $this->tipoId = $tipoId;
            else $this->getTipoId()->setId($tipoId);
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