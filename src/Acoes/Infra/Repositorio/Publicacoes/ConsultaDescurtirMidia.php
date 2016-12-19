<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Publicacoes;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaDescurtirMidia {
    
    public function consultar($usuarioId, $midiaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('curtir');
        $query->where('usuario_id = ?')
                ->add('midia_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $midiaId]);
        return $query->executar('{id}');
    }
}