<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarDadosUsuario {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('u.nome', 'usuarioNome')
                ->add('u.endereco', 'usuarioEndereco')
                ->add('u.nascimento', 'usuarioNascimento')
                ->add('u.telefone', 'usuarioTelefone')
                ->add('u.genero_id', 'usuarioGeneroId')
                ->add('c.visibilidade_id', 'visibilidadeId')
                ->add('c.conta_privada', 'contaPrivada')
                ->add('c.notificacao_publicacao', 'notificacaoPublicacao')
                ->add('c.contato', 'contato')
                ->add('a.id', 'avatarId')
                ->add('a.nome', 'avatarNome')
                ->add('a.endereco', 'avatarEndereco')
                ->add('count(distinct b.id)', 'bloqueados');
        $query->from('usuario', 'u');
        $query->join('configuracoes', 'c')
                ->on('c.usuario_id = u.id')
                ->on('c.ativo = 1');
        $query->join('usuario', 'us', 'left')
                ->on('us.ativo = 1');
        $query->join('bloqueado', 'b', 'left')
                ->on('b.usuario_id = u.id')
                ->on('b.usuario_bloqueado_id = us.id')
                ->on('b.ativo = 1');
        $query->join('avatares', 'a', 'left')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->where('u.id = ?')
                ->add('u.ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
}

