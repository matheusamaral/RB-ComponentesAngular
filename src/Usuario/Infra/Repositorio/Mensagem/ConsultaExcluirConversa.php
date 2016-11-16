<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaExcluirConversa {
    
    public function consultar($usuarioId, $usuarioMensagemId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('mensagens');
        $query->where('usuario_id = ? or usuario_id = ?')
                ->add('usuario_mensagem_id = ? or usuario_mensagem_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioMensagemId, $usuarioId, $usuarioMensagemId]);
        return $query->executar();
    }
}
