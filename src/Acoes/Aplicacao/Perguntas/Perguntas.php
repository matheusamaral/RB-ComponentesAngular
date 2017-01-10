<?php
namespace Quickpeek\Acoes\Aplicacao\Perguntas;
use Rubeus\ContenerDependencia\Conteiner;

class Perguntas {
    
    public function perguntas($msg){
        
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        
        $tempo = Conteiner::get('ConfiguracoesQuickpeek')->consultar();
        $perguntas = Conteiner::get('ConsultaLimitePerguntas')->consultar($usuarioId, $localId, $tempo['limitePerguntas']);
        
        if(count($perguntas) < 3){
            
            $cadastro = Conteiner::get('Cadastro');
            
            $msg->setCampo('entidade', 'Perguntas');
            
            if(!$msg->getCampo('Perguntas::visibilidadeId')->get('valor')){
                $visibilidadeId = Conteiner::get('ConsultaVisibilidade')->consultar($usuarioId);
                $msg->setCampo('Perguntas::visibilidadeId', $visibilidadeId);
            }
            
            $msg->setCampo('Perguntas::usuarioId', $usuarioId);
            $cad = $cadastro->cadastrar($msg);
            if($cad){
                $this->conexaoSocket($msg);
            }
        }else{
            $datetime1 = new \DateTime(date('Y-m-d H:i:s'));
            $datetime2 = new \DateTime($perguntas[0]['momento']);
            
            $intervalo = $datetime1->diff($datetime2);
            $minutos = ($intervalo->h * 60) + $intervalo->i;
            $msg->setResultadoEtapa(false, false, ['dados'=>$minutos]);
        }
    }
    
    private function conexaoSocket($msg){
        
        $localId = $msg->getCampo('Perguntas::localId')->get('valor');
        $visibilidadeId = $msg->getCampo('Perguntas::visibilidadeId')->get('valor');
        $usuarioId = $msg->getCampoSessao('dadosUsuarioLogado,id');
        
        $dadosBanco = Conteiner::get('DadosBanco');
        $pagina = '27' . '-' . $localId;

        for($i = 0; $i < count($dadosBanco); $i++){
            if($dadosBanco[$i]['usuario'] == $usuarioId){
                $fromConexao = $dadosBanco[$i]['conexao'];
            }
            if(in_array($pagina, $dadosBanco[$i]['pagina'])){
                $toConexao[] = $dadosBanco[$i]['conexao'];
                $usuarioId[] = $dadosBanco[$i]['usuarioId'];
            }
        }
        
        foreach($usuarioId as $v){
            $dadosUsuario[] = Conteiner::get('ConsultaListarDadosUsuario')->consultarDadosVisibilidade($usuarioId, $visibilidadeId, $v);
        }
        
        for($i = 0; $i < count($toConexao); $i++){
            $mensagem[$i]['to'] = $toConexao[$i];
            $mensagem[$i]['from'] = $fromConexao;
            $mensagem[$i]['nome'] = $dadosUsuario[$i]['usuarioNome'];
            $mensagem[$i]['endereco'] = $dadosUsuario[$i]['usuarioEndereco'];
        }
        
        $cmd = Conteiner::get('Socket');
        for($i = 0; $i < count($toConexao); $i++){
            $cmd->enviarMensagem($mensagem[$i]);
        }
        
        $dados['to'] = $toConexao;
        $dados['from'] = $fromConexao;
        $dados['nome'] = $dadosUsuario['usuarioNome'];
    }
}