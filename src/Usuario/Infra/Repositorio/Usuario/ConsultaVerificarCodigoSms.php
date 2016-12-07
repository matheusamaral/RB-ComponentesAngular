<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Usuario;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVerificarCodigoSms {
    
    public function consultar($telefone, $codigo, $editando, $tempo){
        
        $query = Conteiner::get('Query', false);
        $query->select('id')
                ->add('usuario_id', 'usuarioId')
                ->add('telefone')
                ->add('editando');
        $query->from('sms_codigo');
        $query->where('telefone = ?')
                ->add('codigo = ?')
                ->add('editando = ?')
                ->add('momento > date_add(now(), INTERVAL -? MINUTE)')
                ->add('confirmado = 0')
                ->add('ativo = 1');
        $query->addVariaveis([$telefone, $codigo, $editando, $tempo]);
        return $query->executar('A');
    }
}