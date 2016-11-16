<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaConversa {
    
    public function consultar($usuarioId, $usuarioMensagemId){
        
        $query = Conteiner::get('Query', false);
        $query->select('m.id', 'id')
                ->add('ifnull(m.titulo, m.endereco)', 'msg')
                ->add('m.usuario_id', 'usuarioId')
                ->add('m.momento', 'momento')
                ->add('m.status_mensagem_id', 'statusMensagem');
        $query->from('mensagens', 'm');
        $query->join('mensagens_excluidas', 'me', 'left')
                ->on('me.mensagens_id = m.id')
                ->on('me.ativo = 1')
                ->on('me.usuario_id = ?');
        $query->where('(m.usuario_id = ? or m.usuario_mensagem_id = ?)')
                ->add('(m.usuario_id = ? or m.usuario_mensagem_id = ?)')
                ->add('me.id is null')
                ->add('m.ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioId, $usuarioId, $usuarioMensagemId, $usuarioMensagemId]);
        return $query->executar();
    }
}
