<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Listar;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaListarRespostas {
    
    public function consultar($usuarioId, $perguntasId){
        
        $query = Conteiner::get('Query', false);
        $query->select('r.titulo', 'titulo')
                ->add('r.usuario_id', 'usuarioId')
                ->add('r.perguntas_id', 'perguntasId')
                ->add('r.check_in', 'checkIn');
        $query->from('respostas', 'r');
        $query->join('pergunta_usuario', 'pu')
                ->on('pu.perguntas_id = r.perguntas_id');
        $query->where('pu.usuario_id = ?')
                ->add('pu.perguntas_id = ?')
                ->add('pu.ativo = 1')
                ->add('r.ativo = 1');
        $query->addVariaveis([$usuarioId, $perguntasId]);
        return $query->executar();
    }
}
