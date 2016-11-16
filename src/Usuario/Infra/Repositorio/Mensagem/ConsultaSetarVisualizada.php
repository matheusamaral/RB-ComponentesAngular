<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSetarVisualizada {
    
    public function consultar($usuarioId, $usuarioMensagemId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('mensagens');
        $query->where('usuario_id = ?')
                ->add('usuario_mensagem_id = ?')
                ->add('status_mensagem_id = 2')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioMensagemId]);
        return $query->executar();
    }
}
