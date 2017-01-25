<?php
namespace Quickpeek\Usuario\Infra\Repositorio\Mensagem;
use Rubeus\ContenerDependencia\Conteiner;

class ConsultaAgrupamento {
    
    public function consultar($mensagemId){
        
        $query = Conteiner::get('Query', false);
        $query->select("concat(usuario_id, '-', usuario_mensagem_id, '-',  visibilidade_usuario_id, '-',  visibilidade_mensagens_id)", 'agrupamento');
        $query->from('mensagens');
        $query->where('id = ?')
                ->add('ativo = 1');
        $query->addVariaveis($mensagemId);
        return $query->executar('{agrupamento}');
    }
}