<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class Perguntas {
    
    public function perguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $query = Conteiner::get('ConsultaLimitePerguntas')->consultar($usuarioId, $localId, $tempo['limitePerguntas']);
        
        if(count($query) < 3){
            $cadastro = Conteiner::get('Cadastro');
            
            $msg->setCampo('entidade', 'Perguntas');
            
            if(!$msg->getCampo('Perguntas::visibilidadeId')->get('valor')){
                $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
                $msg->setCampo('Perguntas::visibilidadeId', $visibilidadeId);
            }
            
            $msg->setCampo('Perguntas::usuarioId', $usuarioId);
            $cadastro->cadastrar($msg);
            $this->enviarNotificacao($msg);
        }
    }
    
    private function enviarNotificacao($msg){
        
    }
}