<?php
namespace Quickpeek\Acoes\Aplicacao\StatusChat;
use Rubeus\ContenerDependencia\Conteiner;

class StatusChat {
    
    public function setarStatus($usuarioId, $status){
        
        $msg = Conteiner::get('Mensagem');
        $pagina = 39 . '-' . $usuarioId;
        $dadosBanco = Conteiner::get('DadosBanco');
        
        foreach($dadosBanco as $v){
            if($v['usuario'] == $usuarioId){
                $fromConexao = $v['conexao'];
            }
            $valor = explode('-', $v['pagina']);
            if(count($valor) > 3){
                $paginas[0] = $valor[0] . '-' . $valor[1];
                $paginas[1] = $valor[0] . '-' . $valor[2];
            }
            if(isset($paginas) && in_array($pagina, $paginas) && $v['usuario'] != $usuarioId){
                $toConexao[] = $v['conexao'];
                $usuarios[] = $v['usuario'];
            }
        }
        
        if(isset($toConexao)){
            for($i = 0; $i < count($toConexao);$i++){
                $mensagem[$i]['online'] = $status;
                $mensagem[$i]['to'] = $toConexao[$i];
                $mensagem[$i]['from'] = $fromConexao;
                $mensagem[$i]['usuario'] = $usuarioId;
                $mensagem[$i]['usuarioMensagemId'] = $usuarios[$i];
                
                Conteiner::get('Socket')->enviarMensagem($mensagem, $mensagem[$i]['to']);
            }
        }
        $msg->setResultadoEtapa(true);
    }
}