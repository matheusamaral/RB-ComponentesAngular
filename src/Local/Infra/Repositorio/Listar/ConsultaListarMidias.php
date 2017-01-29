<?php
namespace Quickpeek\Local\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarMidias{
    
    public function consultar($localId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('endereco')
                ->add('usuario_id', 'usuarioId')
                ->add('momento');
        $query->from('midia');
        $query->where('local_id = ?')
                ->add('momento > date_add(now(), INTERVAL -? HOUR)')
                ->add('ativo = 1');
        $query->group('id');
        $query->order('momento desc');
        $query->addVariaveis([$localId, $tempo]);
        return $query->executar();
    }
    
    public function consultarCurtidas($usuarioId, $midiaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('u.id', 'usuarioId')
                ->add('case when c.visibilidade_id = 1 then u.nome'
                        . ' when c.visibilidade_id = 2 and s.id is not null then u.nome'
                        . " when c.usuario_id = $usuarioId and c.visibilidade_id != 3 then u.nome"
                        . ' else a.nome end', 'nome')
                ->add('c.momento', 'momento');
        $query->from('curtir', 'c');
        $query->join('usuario', 'u')
                ->on('u.id = c.usuario_id')
                ->on('u.ativo = 1');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('avatares', 'a', 'left')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->where('c.midia_id = ?')
                ->add('c.ativo = 1');
        $query->order('momento desc');
        $query->addVariaveis([$usuarioId, $midiaId]);
        return $query->executar();
    }
}
