<?php
namespace Quickpeek\Acoes\Aplicacao\Notificacoes;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\ManipulacaoEntidade\Dominio\ConteinerEntidade;

class VisualizarNotificacoes {
    
    public function visualizarNotificacoes($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $notificacoesId = Conteiner::get('ConsultaVisualizarNotificacoes')->consultar($usuarioId);
        
        if($notificacoesId){
            foreach($notificacoesId as $v){
                $visualizado[] = 1;
            }
            $entidade = ConteinerEntidade::getInstancia('Notificacoes');
            $entidade->set('id', $notificacoesId);
            $entidade->set('visualizado', $visualizado);
            $entidade->salvar();
            
            if(!$entidade->getErro()){
                $msg->setResultadoEtapa(true);
            }else{
                $msg->setResultadoEtapa(false);
            }
        }
    }
}