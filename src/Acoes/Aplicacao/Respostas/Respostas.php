<?php
namespace Quickpeek\Acoes\Aplicacao\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class Respostas {
    
    public function respostas($msg){
        
        $cadastro = Conteiner::get('Cadastro');
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $perguntaId = $msg->getCampo('Respostas::perguntasId')->get('valor');
        
        $query = Conteiner::get('ConsultaRespostas')->consultar($perguntaId, $usuarioId);
        
        if($query){
            $msg->setCampo('Respostas::checkIn', 1);
        }else{
            $msg->setCampo('Respostas::checkIn', 0);
        }
        
        $msg->setCampo('entidade', 'Respostas');
        $msg->setCampo('Respostas::usuarioId', $usuarioId);
        $suc = $cadastro->cadastrar($msg);
                
        if($suc){
            $msg->setCampo('entidade', 'Perguntas');
            $msg->setCampo('Perguntas::id', $perguntaId);
            $msg->setCampo('Perguntas::respondida', 1);
            $cadastro->cadastrar($msg);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
