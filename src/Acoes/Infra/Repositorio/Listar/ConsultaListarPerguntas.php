<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarPerguntas {
    
    public function consultar($localId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('titulo')
                ->add('respondida')
                ->add('usuario_id', 'usuarioId')
                ->add('local_id', 'localId');
        $query->from('perguntas');
        $query->where('local_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$localId]);
        return $query->executar();
    }
}
