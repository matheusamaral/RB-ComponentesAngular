<?php
require 'iniciar.php';
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Rubeus\ContenerDependencia\Conteiner;
use Rubeus\Servicos\Entrada\Sessao;
use Rubeus\Processo\Dominio\Processo\RepositorioProcesso;

class Chat implements MessageComponentInterface {
    protected $clients;
    protected $dadosBanco = [];
    public $maiorQtd = 0;
    
    public function __construct(){
        $this->clients = new \SplObjectStorage;
    }
    
    public function onOpen(ConnectionInterface $conn){
        if(count($this->clients) > $this->maiorQtd){
            $this->maiorQtd = count($this->clients);
        }
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})" . " - connections:   " . $this->maiorQtd . "\n";
    }
    
    public function setarDadosBanco($resourceId, $usuarioId, $pagina){
        
        foreach($this->dadosBanco as $k=>$v){
            if($v['usuario'] == $usuarioId){
                $position = $k;
            }
        }
        
        if(!isset($position)){
            $this->dadosBanco[] = ['conexao' => $resourceId, 'usuario' => $usuarioId, 'pagina' => $pagina];
        }else{
            $this->dadosBanco[$position] = ['conexao' => $resourceId, 'usuario' => $usuarioId, 'pagina' => $pagina];
        }
        
        Conteiner::registrar('DadosBanco', $this->dadosBanco);
        Conteiner::get('StatusChat')->setarStatus($usuarioId, 1);
    }
    
    public function getConexao($usuarioId, $pagina){
        
        $dadosBanco = Conteiner::get('DadosBanco');
        
        foreach($dadosBanco as $v){
            if($v['usuario'] == $usuarioId){
                $fromConexao = $v['conexao'];
            }
            if($v['pagina'] == $pagina){
                $toConexao[] = $v['conexao'];
                $usuarios[] = $v['usuario'];
                $paginas[] = $pagina;
                if($v['usuario'] == $usuarioId){
                    $remetente[] = 1;
                }else{
                    $remetente[] = 0;
                }
            }
        }
        
        if(isset($toConexao)){
            return ['fromConexao'=>$fromConexao, 'toConexao'=>$toConexao, 'usuarios'=>$usuarios, 'paginas'=>$paginas, 'remetente'=>$remetente];
        }else{
            return false;
        }
    }
    
    public function onMessage(ConnectionInterface $from, $mensagem){
        Sessao::setSessionPhp(1);
        $obj = json_decode($mensagem);
        Sessao::iniciar($obj->codsessrt);
        $msg = Conteiner::get('Mensagem', false);
        foreach($obj as $k=>$v){
            $msg->setCampo($k, $v);
        }
        $msg->setCampo('ResourceId', $from->resourceId);
        $processo = RepositorioProcesso::get($obj->processo, $obj->etapa);
        
        $resultado = $processo->executar($msg, true);
        
        $this->enviarMensagem($resultado, $from->resourceId);
    }
    
    public function enviarMensagem($mensagem, $conexao){
        
        foreach($this->clients as $client){
            if($client->resourceId == $conexao){
                $client->send(json_encode($mensagem));
            }
        }
    }
    
    public function onClose(ConnectionInterface $conn){
        
        foreach($this->dadosBanco as $k=>$v){
            if($v['conexao'] == $conn->resourceId){
                Conteiner::get('StatusChat')->setarStatus($v['usuario'], 0);
                unset($this->dadosBanco[$k]);
                $this->dadosBanco = array_values($this->dadosBanco);
            }
        }
        
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }
    
    public function onError(ConnectionInterface $conn, \Exception $e){
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
    
    private function registrar(ConnectionInterface $conn, $id){
        for($i=0;$i<count($this->dadosBanco);$i++){
            if($this->dadosBanco[$i]['id'] == $id){
                $this->dadosBanco[$i]['conexao'] = $conn->resourceId;
                break;
            }
        }
    }
}
$chat = new Chat();
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
                $chat
        )
    ),
    9876
);
Conteiner::registrar('Socket', $chat);

$server->run();
