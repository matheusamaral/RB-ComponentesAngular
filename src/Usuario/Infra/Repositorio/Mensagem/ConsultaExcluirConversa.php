<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaExcluirConversa {
    
    public function consultar($usuarioId, $usuarioMensagemId, $visibilidadeMensagensId, $visibilidadeUsuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('m.id', 'id');
        $query->from('mensagens', 'm');
        $query->join('mensagens_excluidas', 'me', 'left')
                ->on('me.mensagens_id = m.id')
                ->on('me.ativo = 1');
        $query->where('((m.usuario_id = ? and m.usuario_mensagem_id = ?)')
                ->add('or', '(m.usuario_id = ? and m.usuario_mensagem_id = ?))')
                ->add('me.id is null')
                ->add('m.visibilidade_mensagens_id = case when m.usuario_id = ? then ? else ? end')
                ->add('m.visibilidade_usuario_id = case when m.usuario_id = ? then ? else ? end')
                ->add('m.ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioMensagemId, $usuarioMensagemId, $usuarioId, $usuarioId, $visibilidadeMensagensId, 
            $visibilidadeUsuarioId, $usuarioId, $visibilidadeUsuarioId, $visibilidadeMensagensId]);
        return $query->executar('AA1', false, 'id');
    }
}
