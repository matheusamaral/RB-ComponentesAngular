<?php
namespace Quickpeek\Usuario\Infra\Repositorio\SessaoBanco;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSessaoBanco {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('codigo');
        $query->from('sessaobanco');
        $query->where()
                ->like('dados_sessao', '"id":"' . $usuarioId . '"');
        return $query->executar('A');
    }
}