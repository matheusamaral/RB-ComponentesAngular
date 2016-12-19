<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Respostas;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaUsuarioPergunta {
    
    public function consultar($perguntaId){
        
        $query = Conteiner::get('Query', false);
        $query->select('usuario_id');
        $query->from('perguntas');
        $query->where('id = ?')
                ->add('ativo = 1');
        $query->addVariaveis($perguntaId);
        return $query->executar('{usuario_id}');
    }
}