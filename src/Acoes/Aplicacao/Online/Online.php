<?php
namespace Quickpeek\Acoes\Aplicacao\Online;
use Rubeus\ContenerDependencia\Conteiner;

class Online {
    
    public function online($usuarioId){
        
        $msg = Conteiner::get('Mensagem')->get('valor');
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
                if($valor == $pagina){
                    $toConexao[] = $dadosBanco[$i]['conexao'];
                    $usuarios[] = $dadosBanco[$i]['usuario'];
                    $paginas[] = $pagina;
                }
            }
        }
    }
}