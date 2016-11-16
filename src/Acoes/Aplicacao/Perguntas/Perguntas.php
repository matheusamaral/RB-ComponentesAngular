<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class Perguntas {
    
    public function perguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        
        $query = Conteiner::get('ConsultaLimitePerguntas')->consultar($usuarioId, $localId);
        
        if(count($query) < 3){
            $cadastro = Conteiner::get('Cadastro');

            $msg->setCampo('entidade', 'Perguntas');
            $msg->setCampo('Perguntas::usuarioId', $usuarioId);
            $cadastro->cadastrar($msg);

            $queryUser = Conteiner::get('ConsultaUsuariosPerguntas')->consultar($localId);

            if($queryUser){
                $perguntasId = $msg->getCampo('Perguntas::id')->get('valor');
                foreach($queryUser as $v){
                    $perguntas[] = $perguntasId;
                    $usuarios[] = $v['usuarioId'];
                }
                
                if(!in_array($usuarioId, $usuarios)){
                    $perguntas[] = $perguntasId;
                    $usuarios[] = $usuarioId;
                }
                
                $msg->setCampo('entidade', 'PerguntaUsuario');
                $msg->setCampo('PerguntaUsuario::perguntasId', $perguntas);
                $msg->setCampo('PerguntaUsuario::usuarioId', $usuarios);
                $cadastro->cadastrar($msg);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
    }
}