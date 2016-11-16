<?php
namespace Quickpeek\Local\Aplicacao\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ListarAreaMapa {
    
    public function listarAreaMapa($msg){
        
        $hashtag = Conteiner::get('ConsultaHashtag')->consultar();
        var_dump($hashtag);
    }
}
