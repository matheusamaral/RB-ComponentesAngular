<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class Perguntas {
    
    public function perguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $perguntas = Conteiner::get('ConsultaLimitePerguntas')->consultar($usuarioId, $localId, $tempo['limitePerguntas']);
        
        if(count($perguntas) < 3){
            $cadastro = Conteiner::get('Cadastro');
            
            $msg->setCampo('entidade', 'Perguntas');
            
            if(!$msg->getCampo('Perguntas::visibilidadeId')->get('valor')){
                $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
                $msg->setCampo('Perguntas::visibilidadeId', $visibilidadeId);
            }
            
            $msg->setCampo('Perguntas::usuarioId', $usuarioId);
            $cadastro->cadastrar($msg);
        }else{
            $datetime1 = new \DateTime(date('Y-m-d H:i:s'));
            $datetime2 = new \DateTime($perguntas[0]['momento']);
            
            $intervalo = $datetime1->diff($datetime2);
            $minutos = ($intervalo->h * 60) + $intervalo->i;
            $msg->setResultadoEtapa(false, false, ['dados'=>$minutos]);
        }
    }
}