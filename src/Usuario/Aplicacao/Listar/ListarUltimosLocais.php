<?php
namespace Quickpeek\Usuario\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarUltimosLocais {
    
    public function listarUltimosLocais($msg){
        
        $usuarioId = $msg->getCampo('Usuario::id')->get('valor');
        
        if(!$usuarioId){
            $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        }
        
        $query = Conteiner::get('ConsultaListarUltimosLocais')->consultar($usuarioId);
        
        if($query){
            $dados = $this->localizar($msg, $query);
            $msg->setResultadoEtapa(true, false, ['dados'=>$dados]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
    
    private function localizar($msg, $query){
        
        $latitude = $msg->getCampo('Local::latitude')->get('valor');
        $longitude = $msg->getCampo('Local::longitude')->get('valor');
        
        $localizacao = Conteiner::get('Localizacao');
        
        foreach($query as $k=>$v){
            $distancia[] = $localizacao->distancia($latitude, $longitude, $v['latitude'], $v['longitude']);
            $query[$k]['distancia'] = $distancia[$k];
        }
        
        return $query;
    }
}
