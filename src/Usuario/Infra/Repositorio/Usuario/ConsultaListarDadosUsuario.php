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
                ->add('u.tutorial', 'tutorial')
                ->add('c.visibilidade_id', 'visibilidadeId')
                ->add('c.conta_privada', 'contaPrivada')
                ->add('c.notificacao_publicacao', 'notificacaoPublicacao')
                ->add('c.contato', 'contato')
                ->add('a.id', 'avatarId')
                ->add('a.nome', 'avatarNome')
                ->add('a.endereco', 'avatarEndereco')
                ->add('ifnull(ci.visibilidade_id, c.visibilidade_id)', 'visibilidadeCheckInId')
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
        $query->join('check_in', 'ci', 'left')
                ->on('ci.usuario_id = u.id')
                ->on('ci.presente = 1')
                ->on('ci.ativo = 1');
        $query->where('u.id = ?')
                ->add('u.ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
    
    public function consultarDadosVisibilidade($usuarioId, $visibilidadeId, $usuario2 = 0){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add("case when $visibilidadeId = 1 then u.nome "
                . "when $visibilidadeId = 2 and s.id is not null then u.nome "
                . "else a.nome end", 'usuarioNome')
                ->add("case when $visibilidadeId = 1 then u.endereco "
                        . "when $visibilidadeId = 2 and s.id is not null then u.endereco "
                        . "else a.endereco end", 'usuarioEndereco');
        $query->from('usuario', 'u');
        $query->join('avatares', 'a')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = ?')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->where('u.id = ?')
                ->add('u.ativo = 1');
        $query->addVariaveis([$usuario2, $usuarioId, $usuarioId]);
        return $query->executar('A');
    }
    
    public function consultarDadosVisibilidadeMensagens($usuarioId, $visibilidadeId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add("case when $visibilidadeId = 1 then u.nome "
                        . "else a.nome end", 'usuarioNome')
                ->add("case when $visibilidadeId = 1 then u.endereco "
                        . "else a.endereco end", 'usuarioEndereco');
        $query->from('usuario', 'u');
        $query->join('avatares', 'a')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->where('u.id = ?')
                ->add('u.ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('A');
    }
    
    public function consultarTutorial($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('tutorial');
        $query->from('usuario');
        $query->where('id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId]);
        return $query->executar('{tutorial}');
    }
}

