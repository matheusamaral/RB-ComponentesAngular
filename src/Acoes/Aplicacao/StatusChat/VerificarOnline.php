<?php
namespace Quickpeek\Acoes\Aplicacao\StatusChat;
use Rubeus\ContenerDependencia\Conteiner;

class VerificarOnline {
    
    public function verificarOnline($msg){
        
        $usuarioId = $msg->getCampo('UsuarioId')->get('valor');
        $dadosBanco = Conteiner::get('DadosBanco');
        
        foreach($dadosBanco as $v){
            if($v['usuario'] == $usuarioId){
                $toConexao = $v['conexao'];
            }
        }
        
        if(isset($toConexao)){
            $msg->setResultadoEtapa(true);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}