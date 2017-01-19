<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarUltimosLocais {
    
    public function listarUltimosLocais($msg){
        
        $usuarioId = $msg->getCampo('Usuario::id')->get('valor');
        $latitude = $msg->getCampo('Local::latitude')->get('valor');
        $longitude = $msg->getCampo('Local::longitude')->get('valor');
        $usuarioSessaoId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $consulta = Conteiner::get('ConsultaListarUltimosLocais');
        if(!$usuarioId){
            $ultimosLocais = $consulta->consultar($usuarioSessaoId, $latitude, $longitude, 0);
            $localAtual = $consulta->consultar($usuarioSessaoId, $latitude, $longitude, 1);
            $usuarioIdConsulta = $usuarioSessaoId;
        }else{
            $ultimosLocais = $consulta->consultarComVisibilidade($usuarioSessaoId, $usuarioId, $latitude, $longitude, 0);
            $localAtual = $consulta->consultarComVisibilidade($usuarioSessaoId, $usuarioId, $latitude, $longitude, 1);
            $usuarioIdConsulta = $usuarioId;
        }
        
        if(!$localAtual){
            $localAtual = $consulta->consultarCasaTrabalho($usuarioIdConsulta);
            if($localAtual){
                $dados['localAtual']['local'] = 0;
            }
        }else{
            $dados['localAtual']['local'] = 1; 
        }
        
        if($localAtual){
            $dados['localAtual']['dados'] = $localAtual;
        }
        
        if($ultimosLocais){
            $dados['ultimosLocais'] = $ultimosLocais;
        }
        
        
        if($dados){
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}
