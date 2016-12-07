<?php
namespace Quickpeek\Local\Infra\Repositorio\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaPerguntaUsuario {
    
    public function consultar($usuarioId, $perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('pergunta_usuario');
        $query->where('usuario_id = ?')->add('perguntas_id = ?')->add('ativo = 1')
                ->add('visualizado = 0');
        $query->addVariaveis([$usuarioId, $perguntaId]);
        return $query->executar('{id}');
    }
}