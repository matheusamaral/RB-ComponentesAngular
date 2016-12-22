<?php
namespace Quickpeek\Acoes\Infra\Repositorio\Seguir;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaContaPrivada {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('conta_privada', 'contaPrivada');
        $query->from('configuracoes');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{contaPrivada}');
    }
}
