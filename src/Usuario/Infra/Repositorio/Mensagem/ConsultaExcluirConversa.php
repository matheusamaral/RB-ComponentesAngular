<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaExcluirConversa {
    
    public function consultar($usuarioId, $usuarioMensagemId, $visibilidadeMensagensId, $visibilidadeUsuarioId){
        
        $query = Conteiner::get('Query', false);
        $query->select('id');
        $query->from('mensagens');
        $query->where('((usuario_id = ? and usuario_mensagem_id = ?)')
                ->add('or', '(usuario_id = ? and usuario_mensagem_id = ?))')
                ->add('visibilidade_mensagens_id = ?')
                ->add('visibilidade_usuario_id = ?')
                ->add('ativo = 1');
        $query->addVariaveis([$usuarioId, $usuarioMensagemId, $usuarioMensagemId, $usuarioId, $visibilidadeMensagensId, $visibilidadeUsuarioId]);
        return $query->executar();
    }
}
