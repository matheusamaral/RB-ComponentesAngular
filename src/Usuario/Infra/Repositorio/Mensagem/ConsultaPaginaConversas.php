<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaPaginaConversas {
    
    public function consultar($usuarioId, $notIn){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('men.usuario_id', 'usuarioMensagemId')
                ->add("case when u.ativo = 0 or b.id is not null then 'http://192.168.0.121:8000/QuickPeek/quickpeek/QuickPeek/www/img/96.svg' "
                        . 'when men.usuario_id = ? and men.visibilidade_usuario_id = 2 then a.endereco '
                        . 'when men.usuario_id != ? and men.visibilidade_mensagens_id = 2 then a.endereco '
                        . 'else u.endereco end', 'endereco')
                ->add("case when u.ativo = 0 or b.id is not null then 'Usuário do Quickpeek' "
                        . 'when men.usuario_id = ? and men.visibilidade_usuario_id = 2 then a.nome '
                        . 'when men.usuario_id != ? and men.visibilidade_mensagens_id = 2 then a.nome '
                        . 'else u.nome end', 'nome')
                ->add('count(distinct me.id)', 'mensagens')
                ->add('men.id', 'mensagemId')
                ->add('men.titulo', 'mensagem')
                ->add('men.endereco', 'mensagemEndereco')
                ->add("case when men.usuario_mensagem_id = ? then concat(men.usuario_mensagem_id, '-', men.usuario_id, '-', 
                    men.visibilidade_mensagens_id, '-', men.visibilidade_usuario_id) else concat(men.usuario_id, '-', 
                    men.usuario_mensagem_id, '-', men.visibilidade_usuario_id, '-', men.visibilidade_mensagens_id) end", 'agrupamento')
                ->add("concat(men.usuario_mensagem_id, '-', men.usuario_id, '-', 
                    men.visibilidade_mensagens_id, '-', men.visibilidade_usuario_id)", 'agrupamentoDois')
                ->add('case when men.usuario_id = ? then men.visibilidade_mensagens_id else men.visibilidade_usuario_id end', 'visibilidadeMensagensId')
                ->add('case when men.usuario_id = ? then men.visibilidade_usuario_id else men.visibilidade_mensagens_id end', 'visibilidadeUsuarioId');
        $query->from('usuario', 'u');
        $query->join($this->subConsulta(), 'm')
                ->on('1');
        $query->join('mensagens', 'men')
                ->on('men.id = m.id')
                ->on('men.ativo = 1')
                ->on('case when men.usuario_mensagem_id = ? then u.id = men.usuario_id else u.id = men.usuario_mensagem_id end');
        $query->join('mensagens', 'me', 'left')
                ->on('me.usuario_mensagem_id = ?')
                ->on('me.status_mensagem_id in(1, 2)')
                ->on('me.usuario_id = u.id')
                ->on('me.visibilidade_mensagens_id = case when men.usuario_id = ? then men.visibilidade_usuario_id '
                        . 'else men.visibilidade_mensagens_id end')
                ->on('me.visibilidade_usuario_id = case when men.usuario_id = ? then men.visibilidade_mensagens_id '
                        . 'else men.visibilidade_usuario_id end');
        $query->join('avatares', 'a')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('bloqueado', 'b', 'left')
                ->on('b.usuario_id = u.id')
                ->on('b.usuario_bloqueado_id = ?')
                ->on('b.visibilidade_id = case when men.usuario_id = ? then men.visibilidade_mensagens_id else men.visibilidade_usuario_id end')
                ->on('b.ativo = 1');
        $query->where('case when men.usuario_mensagem_id = ? then u.id = men.usuario_id '
                . ' else u.id = men.usuario_mensagem_id end');
        $query->group('agrupamento');
        $query->having('agrupamento not in ('. $notIn .')');
        $query->order('men.id desc');
        $query->limit(15);
        $query->addVariaveis([$usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, 
            $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId]);
        return $query->executar();
    }
    
    private function subConsulta(){
        
        $query = Conteiner::get('Query', false);
        $query->select('max(id)', 'id');
        $query->from('mensagens');
        $query->where('case when usuario_id = ? then status_mensagem_id in (1, 2, 3, 4) else status_mensagem_id != 4 end')
                ->add('(usuario_id = ? or usuario_mensagem_id = ?)')
                ->add('ativo = 1');
        $query->group("case when usuario_mensagem_id = ? then concat(usuario_mensagem_id, '-', usuario_id, '-', visibilidade_mensagens_id, '-', 
            visibilidade_usuario_id) else concat(usuario_id, '-', usuario_mensagem_id, '-', visibilidade_usuario_id, '-', visibilidade_mensagens_id) 
            end");
        return $query;
    }
}