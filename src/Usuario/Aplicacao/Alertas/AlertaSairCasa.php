<?php
namespace Quickpeek\Usuario\Aplicacao\Alertas;
use Rubeus\ContenerDependencia\Conteiner;

class AlertaSairCasa {
    
    public function alertaSairCasa($msg){
        
        $dia = $this->verificarDiaSemana();
        Conteiner::get('ConsultaAlertaSairCasa')->consultar($dia);
    }
    
    private function verificarDiaSemana(){
        
        $dia = date('N') + 1;
        switch($dia){
            case 1:
                return 0;
            case 2:
                return 1;
            case 3:
                return 2;
            case 4:
                return 3;
            case 5:
                return 4;
            case 6:
                return 5;
            case 7:
                return 6;
        }
    }
}