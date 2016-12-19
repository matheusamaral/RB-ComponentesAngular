<?php
namespace Quickpeek;
use Rubeus\ContenerDependencia\Conteiner;

class LerJson {
    
    public function lerJson($msg){
        
        $file = file_get_contents(__DIR__.'/countries.json');
        $json = json_decode($file);
        
        foreach($json as $v){
            $nome[] = $v->name->common;
            $ddi[] = $v->callingCode[0];
        }
        
        $msg->setCampo('entidade', 'DdiPaises');
        $msg->setCampo('DdiPaises::ddi', $ddi);
        $msg->setCampo('DdiPaises::nome', $nome);
        Conteiner::get('Cadastro')->cadastrar($msg);
    }
}