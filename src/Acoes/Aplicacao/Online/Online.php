<?php
namespace Quickpeek\Acoes\Aplicacao\Online;
use Rubeus\ContenerDependencia\Conteiner;

class Online {
    
    public function online($usuarioId){
        
        $msg = Conteiner::get('Mensagem');
        $pagina = 37 . '-' . $usuarioId;
        $dadosBanco = Conteiner::get('DadosBanco');
        
        for($i = 0; $i < count($dadosBanco); $i++){
            if($dadosBanco[$i]['usuario'] == $usuarioId){
                $fromConexao = $dadosBanco[$i]['conexao'];
        }
            foreach($dadosBanco[$i] as $k=>$v){
                if($k == 'pagina'){
                    $valor = explode('-', $v);
                    $paginas[0] = $valor[0] . '-' . $valor[1];
                    $paginas[1] = $valor[0] . '-' . $valor[2];
                }
                if(in_array($pagina, $paginas)){
                    $toConexao[] = $dadosBanco[$i]['conexao'];
                    $usuarios[] = $dadosBanco[$i]['usuario'];
                }
            }
        }
        
        if(isset($toConexao)){
            for($i = 0; $i < count($toConexao);$i++){
                $mensagem[$i]['online'] = 1;
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