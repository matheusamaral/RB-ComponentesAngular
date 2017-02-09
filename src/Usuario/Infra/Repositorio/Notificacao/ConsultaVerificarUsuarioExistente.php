<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Notificacao;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaVerificarUsuarioExistente {
    
    public function consultar($usuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('usuario_onesignal');
        $query->where('usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis($usuarioId);
        return $query->executar('{id}');
    }
}