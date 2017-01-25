<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSetarEntregue {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add("concat(usuario_id, '-', usuario_mensagem_id, '-',  visibilidade_usuario_id, '-',  visibilidade_mensagens_id)", 'agrupamento');
        $query->from('mensagens');
        $query->where('usuario_mensagem_id = ?')
                ->add('status_mensagem_id = 1')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar();
    }
}