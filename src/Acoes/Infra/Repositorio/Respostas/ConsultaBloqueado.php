<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaBloqueado {
    
    public function consultar($usuarioId, $usuarioBloqueadoId, $visibilidadeId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('bloqueado');
        $query->where('usuario_id = ?')
                ->add('usuario_bloqueado_id = ?')
                ->add('visibilidade_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioBloqueadoId, $visibilidadeId]);
        return $query->executar('{id}');
    }
    
    public function consultarCriadorPergunta($perguntasId){
        
        $query = Conteiner::get('Query', false);
        $query->select('usuario_id');
        $query->from('perguntas');
        $query->where('id = ?');
        $query->addVariaveis($perguntasId);
        return $query->executar('{usuario_id}');
    }
}
