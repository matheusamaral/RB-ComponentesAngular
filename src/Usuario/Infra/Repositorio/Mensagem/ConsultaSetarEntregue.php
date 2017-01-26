<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSetarEntregue {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add("case when usuario_id = ? then concat(usuario_mensagem_id, '-', usuario_id, '-', 
                    visibilidade_mensagens_id, '-', visibilidade_usuario_id) else concat(usuario_id, '-', 
                    usuario_mensagem_id, '-', visibilidade_usuario_id, '-', visibilidade_mensagens_id) end", 'agrupamento');
        $query->from('mensagens');
        $query->where('usuario_mensagem_id = ?')
                ->add('status_mensagem_id = 1')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioId]);
        return $query->executar();
    }
}