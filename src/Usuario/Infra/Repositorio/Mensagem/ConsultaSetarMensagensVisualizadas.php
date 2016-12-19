<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSetarMensagensVisualizadas {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('mensagens');
        $query->where('usuario_mensagem_id = ?')
                ->add('visualizado = 0')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('AA1', false, 'id');
    }
}
