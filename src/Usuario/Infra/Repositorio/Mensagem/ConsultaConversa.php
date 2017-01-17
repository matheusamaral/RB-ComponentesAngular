<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaConversa {
    
    public function consultar($usuarioId, $usuarioMensagemId, $visibilidadeMensagensId, $notIn){
        
        $query = Conteiner::get('Query', false);
        $query->select('m.id', 'id')
                ->add('m.titulo', 'mensagem')
                ->add('m.endereco', 'enderecoMensagem')
                ->add('m.momento', 'momento')
                ->add('m.status_mensagem_id', 'statusMensagem')
                ->add('case when u.ativo = 0 or b.id is not null then ' . "'http://192.168.0.121:8000/QuickPeek/quickpeek/QuickPeek/www/img/96.svg'" 
                        . ' when m.visibilidade_mensagens_id = 2 then a.endereco '
                        . ' else u.endereco end', 'endereco')
                ->add('case when u.ativo = 0 or b.id is not null then ' . "'Usuário do Quickpeek'" 
                        . ' when m.visibilidade_mensagens_id = 2 then a.nome'
                        . ' else u.nome end', 'nome');
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
                ->on('b.visibilidade_id = ?')
                ->on('b.ativo = 1');
        $query->where('((m.usuario_id = ? and m.usuario_mensagem_id = ?)')
                ->add('or', '(m.usuario_id = ? and m.usuario_mensagem_id = ?))')
                ->add('me.id is null')
                ->add('m.visibilidade_mensagens_id = ?')
                ->add('case when b.usuario_bloqueado_id = ? then m.status_mensagem_id in(1,2,3,4)'
                        . ' else m.status_mensagem_id != 4 end')
                ->add('m.id not in (' . $notIn . ')')
                ->add('m.ativo = 1');
        $query->order('m.momento');
        $query->limit(50);
        $query->addVariaveis([$usuarioId, $usuarioMensagemId, $usuarioId, $visibilidadeMensagensId, 
            $usuarioMensagemId, $usuarioId, $usuarioId, $usuarioMensagemId, $visibilidadeMensagensId, $usuarioId]);
        return $query->executar();
    }
}
