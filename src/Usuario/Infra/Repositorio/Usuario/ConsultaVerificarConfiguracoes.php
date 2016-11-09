<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVerificarConfiguracoes {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('configuracoes');
        $query->where('usuario_id = ?');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('A');
    }
}