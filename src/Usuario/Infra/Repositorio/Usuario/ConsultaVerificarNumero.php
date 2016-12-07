<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVerificarNumero {
    
    public function consultar($numero, $usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('usuario');
        $query->where('id = ?')
                ->add('telefone = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $numero]);
        return $query->executar('{id}');
    }
    
    public function consultarNumero($numero){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('usuario');
        $query->where('telefone = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$numero]);
        return $query->executar('{id}');
    }
    
    public function consultarNumeroUnico($id){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('numerounico_usuario');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$id]);
        return $query->executar('{id}');
    }
    
    public function consultarIdNumero($numerounico){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('numerounico_usuario');
        $query->where('numerounico = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$numerounico]);
        return $query->executar('{id}');
    }
}