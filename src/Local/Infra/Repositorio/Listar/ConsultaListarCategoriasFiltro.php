<?php
namespace Quickpeek\Local\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarCategoriasFiltro {
    
    public function consultar(){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('titulo')
                ->add("concat('".DOMINIO_PROJETO."',endereco)", 'endereco')
                ->add('0', "'tipo'");
        $query->from('categoria_local');
        $query->where('ativo = 1');
        return $query->executar();
    }
    
    public function consultar2(){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('titulo')
                ->add("concat('".DOMINIO_PROJETO."',endereco)", 'endereco')
                ->add('1', "'tipo'");
        $query->from('categoria_hashtag');
        $query->where('id != 10')
                ->add('ativo = 1');
        return $query->executar();
    }
}