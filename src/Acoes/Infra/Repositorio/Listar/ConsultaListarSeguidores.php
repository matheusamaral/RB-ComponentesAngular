<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarSeguidores {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('usuario_id', 'usuarioId');
        $query->from('seguir');
        $query->where('usuario_seguir_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar();
    }
}