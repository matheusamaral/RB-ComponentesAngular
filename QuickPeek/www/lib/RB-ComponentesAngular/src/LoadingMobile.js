angular.module('RB.loadingMobile', [
    'ionic'
])
.factory('RBLoadingMobile', function($ionicLoading) {
    
    function show(msg) {
        if(!msg || msg=='undefined') msg='Carregando...';
        $ionicLoading.show({
          template:     '<div class="row rb-loading-mobile">\n\
                            <ion-spinner icon="spiral" style="margin-right: 10px;"></ion-spinner>\n\
                            <h5 style="margin: 6px 0px;font-weight: 500;color: #000;font-size: 16px;">'+msg+'</h5>\n\
                        </div>'
        }).then(function(){
        });
      };
    function hide(){
        $ionicLoading.hide().then(function(){
      });
    };
  
    return {
        show: show,
        hide: hide
    };
});