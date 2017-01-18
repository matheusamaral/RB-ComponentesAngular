<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaSetarVisualizada {
    
    public function consultar($usuarioId, $usuarioMensagemId, $visibilidadeMensagemId, $visibilidadeUsuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('mensagens');
        $query->where('usuario_id = ?')
                ->add('usuario_mensagem_id = ?')
                ->add('status_mensagem_id in(1,2)')
                ->add('visibilidade_mensagens_id = ?')
                ->add('visibilidade_usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioMensagemId, $usuarioId, $visibilidadeMensagemId, $visibilidadeUsuarioId]);
        return $query->executar();
    }
}
