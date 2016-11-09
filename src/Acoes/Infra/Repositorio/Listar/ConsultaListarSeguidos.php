<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarSeguidos {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('usuario_seguir_id', 'usuarioSeguirId');
        $query->from('seguir');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar();
    }
}