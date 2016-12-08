<?php
namespace Quickpeek\Local\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarMensagensPerguntas {
    
    public function consultar($usuarioId, $perguntaId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct r.id', 'idResposta')
                ->add('r.titulo', 'titulo')
                ->add('r.endereco', 'enderecoMidia')
                ->add('r.usuario_id', 'usuarioId')
                ->add('case when r.visibilidade_id = 1 then u.nome '
                        . ' when r.visibilidade_id = 2 and s.id is not null then u.nome'
                        . ' else a.nome end', 'nomeUsuario')
                ->add('case when r.visibilidade_id = 1 then u.endereco'
                        . ' when r.visibilidade_id = 2 and s.id is not null then u.endereco'
                        . ' else a.endereco end', 'enderecoUsuario')
                ->add('r.momento', 'momento');
        $query->from('respostas', 'r');
        $query->join('usuario', 'u')->on('u.id = r.usuario_id')
                ->on('u.ativo = 1');
        $query->join('seguir', 's', 'left')->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('avatares', 'a', 'left')->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->where('r.perguntas_id = ?')->add('r.momento > date_add(now(), INTERVAL -? HOUR)')->add('r.ativo = 1');
        $query->addVariaveis([$usuarioId, $perguntaId, $tempo]);
        return $query->executar();
    }
    
    public function consultarPergunta($usuarioId, $perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('p.id', 'perguntaId')
                ->add('p.titulo', 'perguntaTitulo')
                ->add('p.usuario_id', 'usuarioId')
                ->add('case when p.visibilidade_id = 1 then u.nome '
                        . ' when p.visibilidade_id = 2 and s.id is not null then u.nome'
                        . ' else a.nome end', 'nomeUsuario')
                ->add('case when p.visibilidade_id = 1 then u.endereco'
                        . ' when p.visibilidade_id = 2 and s.id is not null then u.endereco'
                        . ' else a.endereco end', 'enderecoUsuario');
        $query->from('perguntas', 'p');
        $query->join('usuario', 'u')->on('u.id = p.usuario_id')
                ->on('u.ativo = 1');
        $query->join('seguir', 's', 'left')->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('avatares', 'a', 'left')->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->where('p.id = ?')->add('p.ativo = 1');
        $query->addVariaveis([$usuarioId, $perguntaId]);
        return $query->executar('A');
    }
}
