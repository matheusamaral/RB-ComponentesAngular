<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class Perguntas {
    
    public function perguntas($msg){
        
        $cadastro = Conteiner::get('Cadastro');
        
        $msg->setCampo('entidade', 'Perguntas');
        $msg->setCampo('Perguntas::usuarioId', $msg->getCampoSessao('dadosUsuarioLogado,id'));
        $cadastro->cadastrar($msg);
        
        $query = Conteiner::get('ConsultaUsuariosPerguntas')->consultar($msg->getCampo('Perguntas::localId')->get('valor'));
        
        if($query){
            $perguntasId = $msg->getCampo('Perguntas::id')->get('valor');
            foreach($query as $v){

                $perguntas[] = $perguntasId;
                $usuarios[] = $v['usuarioId'];
            }
            
            $msg->setCampo('entidade', 'PerguntaUsuario');
            $msg->setCampo('PerguntaUsuario::perguntasId', $perguntas);
            $msg->setCampo('PerguntaUsuario::usuarioId', $usuarios);
            $cadastro->cadastrar($msg);
        }
    }
}