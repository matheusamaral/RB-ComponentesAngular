'use strict';

angular.module('RB.config', [])

.factory('Config', [function() {
   
    var refAmbiente = refAmbienteG;
    var refDiretorio = refAmbienteReqG;
    var refDominio = refDominioG;
        
    function setRefDominio(ref){
        refDominio = ref;
    };
    
    function getRefDominio(ref){
        return refDominio;
    };
    
    function setRefAmbiente (ref){
        refAmbiente = ref;
    };
    
    function setRefAmbienteReq(ref){
        refDiretorio = ref;
    };
   
    function getRefAmbiente(){
        return refAmbiente;
    };
    
    function getRefAmbienteReq(){
        return refDiretorio;
    };
    
    function configurar(){
        habilitarClickHref(); 
    }; 
    
    return {
        habilitarClickHref: habilitarClickHref,
        getRefDominio: getRefDominio,
        setRefDominio: setRefDominio,
        setRefAmbiente: setRefAmbiente ,
        setRefAmbienteReq: setRefAmbienteReq,
        getRefAmbiente: getRefAmbiente,
        getRefAmbienteReq: getRefAmbienteReq,
        configurar: configurar
    };
    
 }]);