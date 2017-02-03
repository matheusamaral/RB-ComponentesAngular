<?php
namespace Quickpeek\Acoes\Aplicacao\Gif;
use Rubeus\ContenerDependencia\Conteiner;

class Search {
    
    public function search($msg){
        
        $pesquisa = $msg->getCampo('Pesquisa')->get('valor');
        $pesquisa = urlencode($pesquisa);
        
        $file = file_get_contents('http://api.giphy.com/v1/gifs/search?q=' . $pesquisa . '&api_key=dc6zaTOxFJmzC');
        $json = json_decode($file);
        
        foreach($json->data as $v){
            $url[] = 'http://i.giphy.com/' . $v->id . '.gif';
        }
        
        if($url){
            $msg->setResultadoEtapa(true, false, ['dados'=>$url]);
        }else{
            $msg->setResultadoEtapa(false);
        }
    }
}