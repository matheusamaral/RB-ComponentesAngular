
'use strict';

/*
 * AngularJS Loading
 * Version: 0.4.9
 *
 * Copyright 2015 Matheus Amaral.  
 * All Rights Reserved.  
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Matheus Amaral
 */

angular.module('RB.loading', ['ngAnimate'])
.factory('RBLoading', function() {
    var scopo = {};
    
    function setScopo(obj){
        scopo = obj;
    };
    
    function getScopo(){
        console.log('getScope');
        return scopo;
    };
    
    function init(scopo){
        setScopo(scopo);
        scopo.loading = false;
    };
    
    function changeStatus(val){
        scopo.loading = val;
    };
    
    return {
      init: init,
      setScopo: setScopo,
      getScopo: getScopo,
      changeStatus: changeStatus
    };
});
