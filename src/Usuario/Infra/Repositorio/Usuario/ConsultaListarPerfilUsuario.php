<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarPerfilUsuario {
    
    public function consultar($usuarioId, $usuarioIdSessao){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('u.nome', 'usuarioNome')
                ->add('u.endereco', 'usuarioEndereco')
                ->add('count(distinct hl.id) + count(distinct m.id)', 'publicacoes')
                ->add('count(distinct s.id)', 'qtdSeguidores')
                ->add('count(distinct se.id)', 'qtdSeguindo')
                ->add('a.id', 'avatarId')
                ->add('a.nome', 'avatarNome')
                ->add("concat('" . DOMINIO_PROJETO . "',a.endereco)", 'avatarEndereco')
                ->add('l.titulo', 'local')
                ->add('case when seg.confirmar_seguir = 1 then 1'
                        . ' when seg.confirmar_seguir = 0 then 2'
                        . ' else 0 end', 'seguindo')
                ->add('seg.id', 'seguirId');
        $query->from('usuario', 'u');
        $query->join('hashtag_local', 'hl', 'left')
                ->on('hl.usuario_id = u.id')
                ->on('hl.ativo = 1');
        $query->join('midia', 'm', 'left')
                ->on('m.usuario_id = u.id')
                ->on('m.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('seguir', 'se', 'left')
                ->on('se.usuario_id = u.id')
                ->on('se.confirmar_seguir = 1')
                ->on('se.ativo = 1');
        $query->join('avatares', 'a', 'left')
                ->on('u.avatares_id = a.id')
                ->on('a.ativo = 1');
        $query->join('check_in', 'ci', 'left')
                ->on('ci.usuario_id = u.id')
                ->on('ci.presente = 1')
                ->on('ci.ativo = 1');
        $query->join('local', 'l', 'left')
                ->on('l.id = ci.local_id')
                ->on('l.ativo = 1');
        $query->join('seguir', 'seg', 'left')
                ->on('seg.usuario_id = ?')
                ->on('seg.usuario_seguir_id = u.id')
                ->on('seg.ativo = 1');
        $query->where('u.id = ?')->add('u.ativo = 1');
        $query->addVariaveis([$usuarioIdSessao, $usuarioId]);
        return $query->executar('A');
    }
}