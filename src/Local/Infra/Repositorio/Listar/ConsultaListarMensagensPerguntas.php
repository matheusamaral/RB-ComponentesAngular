<?php
namespace Quickpeek\Local\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarMensagensPerguntas {
    
    public function consultar($usuarioId, $perguntaId, $tempo, $notIn){
        
        $query = Conteiner::get('Query', false);
        $query->select('distinct r.id', 'respostaId')
                ->add('r.titulo', 'respostaTitulo')
                ->add('r.visibilidade_id', 'respostaVisibilidadeId')
                ->add('r.endereco', 'enderecoMidia')
                ->add('r.usuario_id', 'usuarioId')
                ->add('case when u.ativo = 0 then ' . "'Usuário do Quickpeek'"
                        . ' when r.visibilidade_id = 1 then u.nome '
                        . ' else a.nome end', 'nomeUsuario')
                ->add('case when u.ativo = 0 then ' . "'" . DOMINIO_PROJETO . "/ui/imagens/avatares/96.svg'"
                        . ' when r.visibilidade_id = 1 then u.endereco'
                        . ' else a.endereco end', 'enderecoUsuario')
                ->add('r.momento', 'momento');
        $query->from('respostas', 'r');
        $query->join('usuario', 'u')
                ->on('u.id = r.usuario_id');
        $query->join('avatares', 'a', 'left')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->join('pergunta_excluida', 'pe', 'left')
                ->on('pe.respostas_id = r.id')
                ->on('pe.usuario_id = ?')
                ->on('pe.ativo = 1');
        $query->where('r.perguntas_id = ?')
                ->add('r.momento > date_add(now(), INTERVAL -? HOUR)')
                ->add('pe.id is null')
                ->add('r.id not in(' . $notIn . ')')
                ->add('(r.usuario_id = ? or bloqueado = 0)')
                ->add('r.ativo = 1');
        $query->order('r.momento desc');
        $query->limit(30);
        $query->addVariaveis([$usuarioId, $perguntaId, $tempo, $usuarioId]);
        return $query->executar();
    }
    
    public function consultarPergunta($usuarioId, $perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('p.id', 'perguntaId')
                ->add('p.titulo', 'perguntaTitulo')
                ->add('p.usuario_id', 'usuarioId')
                ->add("case when u.ativo = 0 then 'Usuário do Quickpeek'"
                        . ' when p.visibilidade_id = 1 then u.nome '
                        . ' when p.visibilidade_id = 2 and s.id is not null then u.nome'
                        . " when p.usuario_id = $usuarioId and p.visibilidade_id != 3 then u.nome"
                        . ' else a.nome end', 'nomeUsuario')
                ->add('case when u.ativo = 0 then ' . "'" . DOMINIO_PROJETO . "/ui/imagens/avatares/96.svg'"
                        . ' when p.visibilidade_id = 1 then u.endereco'
                        . ' when p.visibilidade_id = 2 and s.id is not null then u.endereco'
                        . " when p.usuario_id = $usuarioId and p.visibilidade_id != 3 then u.endereco"
                        . ' else a.endereco end', 'enderecoUsuario')
                ->add('p.momento', 'momento');
        $query->from('perguntas', 'p');
        $query->join('usuario', 'u')
                ->on('u.id = p.usuario_id');
        $query->join('seguir', 's', 'left')
                ->on('s.usuario_id = ?')
                ->on('s.usuario_seguir_id = u.id')
                ->on('s.confirmar_seguir = 1')
                ->on('s.ativo = 1');
        $query->join('avatares', 'a', 'left')
                ->on('a.id = u.avatares_id')
                ->on('a.ativo = 1');
        $query->where('p.id = ?')
                ->add('p.ativo = 1');
        $query->addVariaveis([$usuarioId, $perguntaId]);
        return $query->executar('A');
    }
    
    public function consultaRespostasId($perguntaId, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('respostas');
        $query->where('perguntas_id = ?')
                ->add('momento > date_add(now(), INTERVAL -? HOUR)')
                ->add('ativo = 1');
        $query->addVariaveis([$perguntaId, $tempo]);
        return $query->executar('AA1', false, 'id');
    }
}
