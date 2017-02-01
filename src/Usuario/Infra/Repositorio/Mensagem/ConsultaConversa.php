<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaConversa {
    
    public function consultar($usuarioId, $usuarioMensagemId, $visibilidadeMensagensId, $visibilidadeUsuarioId, $notIn){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('m.id', 'id')
                ->add('m.titulo', 'mensagem')
                ->add('m.endereco', 'enderecoMensagem')
                ->add('m.momento', 'momento')
                ->add('m.status_mensagem_id', 'statusMensagem')
                ->add("case when u.ativo = 0 or b.id is not null then " .  "'" . DOMINIO_PROJETO . "/ui/imagens/avatares/96.svg' "
                        . 'when m.visibilidade_mensagens_id = 1 then u.endereco '
                        . "else concat('" . DOMINIO_PROJETO . "',a.endereco end", 'endereco')
                ->add("case when u.ativo = 0 or b.id is not null then 'Usuário do Quickpeek' "
                        . 'when m.visibilidade_mensagens_id = 1 then u.nome '
                        . 'else a.nome end', 'nome');
        $query->from('mensagens', 'm');
        $query->join('mensagens_excluidas', 'me', 'left')
                ->on('me.mensagens_id = m.id')
                ->on('me.usuario_id = ?')
                ->on('me.ativo = 1');
        $query->join('usuario', 'u')
                ->on('u.id = m.usuario_id');
        $query->join('avatares', 'a', 'left')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('bloqueado', 'b', 'left')
                ->on('b.usuario_id = ?')
                ->on('b.usuario_bloqueado_id = ?')
                ->on('b.visibilidade_id = case when m.usuario_id = ? then m.visibilidade_mensagens_id else m.visibilidade_usuario_id end')
                ->on('b.ativo = 1');
        $query->where('((m.usuario_id = ? and m.usuario_mensagem_id = ?)')
                ->add('or', '(m.usuario_id = ? and m.usuario_mensagem_id = ?))')
                ->add('me.id is null')
                ->add('case when m.usuario_id = ? then m.visibilidade_mensagens_id = ? else '
                        . 'm.visibilidade_usuario_id = ? end')
                ->add('case when m.usuario_id = ? then m.visibilidade_usuario_id = ? else '
                        . 'm.visibilidade_mensagens_id = ? end')
                ->add('case when b.usuario_bloqueado_id = ? then m.status_mensagem_id in(1,2,3,4)'
                        . ' else m.status_mensagem_id != 4 end')
                ->add('m.id not in (' . $notIn . ')')
                ->add('m.ativo = 1');
        $query->order('m.id desc');
        $query->limit(50);
        $query->addVariaveis([$usuarioId, $usuarioMensagemId, $usuarioId, $usuarioId, $usuarioId, $usuarioMensagemId, 
            $usuarioMensagemId, $usuarioId, $usuarioId, $visibilidadeMensagensId, $visibilidadeMensagensId, $usuarioId, 
            $visibilidadeUsuarioId, $visibilidadeUsuarioId, $usuarioId]);
        return $query->executar();
    }
}
