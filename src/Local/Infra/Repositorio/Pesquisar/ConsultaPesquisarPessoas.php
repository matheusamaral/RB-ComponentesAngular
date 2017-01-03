<?php
namespace Quickpeek\Local\Infra\Repositorio\Pesquisar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaPesquisarPessoas {
    
    public function consultar($usuarioId, $pesquisa, $notIn){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct u.id', 'usuarioId')
                ->add('u.nome', 'nome')
                ->add('u.endereco', 'endereco')
                ->add('(IFNULL(lc.ativo, 0) * 4) + (IFNULL(MAX(ci.ativo), 0) * 2) + (IFNULL(loc.ativo, 0) * 2) + 
                    (CASE WHEN SUBSTRING(u.telefone, 3, 2) = SUBSTRING(us.telefone, 3, 2) THEN 1 ELSE 0 END) 
                    + (IFNULL(m.ativo, 0) * 3) + (IFNULL(s.ativo, 0) * 3)', 'contagem')
                ->add('case when seg.ativo is not null and seg.confirmar_seguir = 1 then 1'
                        . ' when seg.ativo is not null and seg.confirmar_seguir = 0 then 2'
                        . ' else 0 end', 'seguindo');
        $query->from('usuario', 'u');
        $query->join('lista_contatos', 'lc', 'left')
                ->on('lc.usuario_id = ?')
                ->on("u.telefone like concat('%', lc.telefone)");
        $query->join('usuario', 'us', 'left')
                ->on('us.id = ?')
                ->on('us.ativo = 1');
        $query->join('check_in', 'cin', 'left')
                ->on('cin.usuario_id = u.id')
                ->on('cin.ativo = 1');
        $query->join($this->query1(), 'ci', 'left')
                ->on('ci.local_id = cin.local_id');
        $query->join($this->query2(), 'lo', 'left')
                ->on('lo.usuario_id = u.id');
        $query->join($this->query2(), 'loc', 'left')
                ->on('loc.usuario_id = ?')
                ->on('loc.cidade = lo.cidade')
                ->on('loc.estado = lo.estado')
                ->on('loc.pais = lo.pais');
        $query->join('seguir', 's', 'left')
                ->on('(s.usuario_id = ? and s.usuario_seguir_id = u.id) '
                        . 'or (s.usuario_id = u.id and s.usuario_seguir_id = ?)')
                ->on('s.confirmar_seguir = 1');
        $query->join($this->query4(), 'm', 'left')
                ->on('m.usuario_id = u.id or m.usuario_mensagem_id = u.id');
        $query->join('seguir', 'seg', 'left')
                ->on('seg.usuario_id = ?')
                ->on('seg.usuario_seguir_id = u.id')
                ->on('seg.ativo = 1');
        $query->where()->like('(u.nome', $pesquisa)->like('or', 'u.telefone', $pesquisa, 'cmc')
                ->add(')and', 'u.id not in(' . $notIn . ')');
        $query->group('u.id');
        $query->order('contagem desc');
        $query->limit(15);
        $query->addVariaveis([$usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId, $usuarioId]);
        return $query->executar();
    }
    
    private function query1(){
        
        $query = Conteiner::get('Query', false);
        $query->select('local_id')
                ->add('ativo');
        $query->from('check_in');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        return $query;
    }
    
    private function query2(){
        
        $query = Conteiner::get('Query', false);
        $query->select('max(l.contagem)')
                ->add('l.cidade')
                ->add('l.estado')
                ->add('l.pais')
                ->add('l.ativo')
                ->add('l.usuario_id');
        $query->from($this->query3(), 'l');
        $query->group('l.usuario_id');
        return $query;
    }
    
    private function query3(){
        
        $query = Conteiner::get('Query', false);
        $query->select('l.cidade')
                ->add('l.estado')
                ->add('l.pais')
                ->add('l.ativo')
                ->add('ci.usuario_id')
                ->add('count(distinct ci.id)', 'contagem');
        $query->from('local', 'l');
        $query->join('check_in', 'ci')
                ->on('ci.local_id = l.id')
                ->on('ci.ativo = 1');
        $query->group('ci.usuario_id, l.cidade, l.estado, l.pais');
        $query->order('contagem');
        return $query;
    }
    
    private function query4(){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct ativo')
                ->add('usuario_id')
                ->add('usuario_mensagem_id');
        $query->from('mensagens');
        $query->where('usuario_id = ? or usuario_mensagem_id = ?');
        return $query;
    }
}