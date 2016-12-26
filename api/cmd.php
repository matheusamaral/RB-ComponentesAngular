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
    
    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }
    
    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }
    
    public function setarDadosBanco($resourceId, $usuarioId){
        
        $this->dadosBanco[] = ['conexao' => $resourceId, 'usuario' => $usuarioId];
    }
    
    public function onMessage(ConnectionInterface $from, $mensagem) {
        Sessao::setSessionPhp(1);
        $obj = json_decode($mensagem);
        Sessao::iniciar($obj->codsessrt);
        $msg = Conteiner::get('Mensagem');
        foreach($obj as $k=>$v){
            $msg->setCampo($k, $v);
        }
        $msg->setCampo('ResourceId', $from->resourceId);
        $processo = RepositorioProcesso::get($obj->processo, $obj->etapa);
        $resultado = $processo->executar($msg, true);
        
        for($i = 0; $i < count($this->dadosBanco); $i++){
            if(isset($resultado['from']) && $this->dadosBanco[$i]['usuario'] == $resultado['from']){
                $fromConexao = $this->dadosBanco[$i]['conexao'];
            }
            if(isset($resultado['to']) && in_array($this->dadosBanco[$i]['usuario'], $resultado['to'])){
                $toConexao[] = $this->dadosBanco[$i]['conexao'];
            }
        }
        
        foreach($this->clients as $client){
            if(isset($toConexao) && in_array($client->resourceId, $toConexao)){
                $client->send(json_encode($resultado['toMsg']));
            }
            if($client->resourceId == $fromConexao){
                $client->send(json_encode($resultado['success']));
            }
        }
    }
    
    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }
    
    public function onError(ConnectionInterface $conn, \Exception $e) {
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
    8080
);
Conteiner::registrar('Socket', $chat);

$server->run();
