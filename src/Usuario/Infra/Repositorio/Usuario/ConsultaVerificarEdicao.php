<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVerificarEdicao {
    
    public function consultar($telefone, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('sms_codigo');
        $query->where('telefone = ?')
                ->add('confirmado = 0')
                ->add('editando = 1')
                ->add('momento > date_add(now(), INTERVAL -? MINUTE)')
                ->add('ativo = 1');
        $query->addVariaveis([$telefone, $tempo]);
        return $query->executar('{id}');
    }
}