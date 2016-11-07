<?php
        
namespace Quickpeek\Usuario\Dominio;
use Rubeus\ORM\Persistente as Persistente;

    class Usuario extends Persistente{
        private $id = false;
        private $nome = false;
        private $apelido = false;
        private $endereco = false;
        private $nascimento = false;
        private $telefone = false;
        private $avataresId = false;
        private $generoId = false;
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
                
        public function getApelido() {
            return $this->apelido;
        }

        public function setApelido($apelido) {
            $this->apelido = $apelido;
        } 
                
        public function getEndereco() {
            return $this->endereco;
        }

        public function setEndereco($endereco) {
            $this->endereco = $endereco;
        } 
                
        public function getNascimento() {
            return $this->nascimento;
        }

        public function setNascimento($nascimento) {
            $this->nascimento = $nascimento;
        } 
                
        public function getTelefone() {
            return $this->telefone;
        }

        public function setTelefone($telefone) {
            $this->telefone = $telefone;
        } 
            
        public function getAvataresId() {
            if(!$this->avataresId)
                    $this->avataresId = new Avatares(); 
            return $this->avataresId;
        }

        public function setAvataresId($avataresId) {
            if($avataresId instanceof Avatares)
                $this->avataresId = $avataresId;
            else $this->getAvataresId()->setId($avataresId);
        } 
            
        public function getGeneroId() {
            if(!$this->generoId)
                    $this->generoId = new Genero(); 
            return $this->generoId;
        }

        public function setGeneroId($generoId) {
            if($generoId instanceof Genero)
                $this->generoId = $generoId;
            else $this->getGeneroId()->setId($generoId);
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