angular.module('QuickPeek', [
    'ionic',
    'ionic-toast',
    'ui.router',
    'ngMaterial',
    'ngCordova',
    'RB.GD',
    'ui.mask',
    'RB.navegacao',
    'RB.gcs',
    'RB.loading',
    'QuickPeek.layoutPadrao',
    'QuickPeek.LoadingInicial',
    'QuickPeek.ComeceAgora',
    'QuickPeek.ConfirmaNumero',
    'QuickPeek.ConfirmaSms',
    'QuickPeek.TiraSelfie',
    'QuickPeek.CadastroDados',
    'QuickPeek.Avatares',
    'QuickPeek.Perfil',
    'QuickPeek.Configuracoes',
    'QuickPeek.ConfigConta',
    'QuickPeek.PessoasBloqueadas',
    'QuickPeek.MudarNumero',
    'QuickPeek.MudarNumeroFinal',
    'QuickPeek.ApagarConta',
    'QuickPeek.Seguidores',
    'QuickPeek.Seguindo',
    'base64',
    'QuickPeek.ConfigNotificacoes',
    'QuickPeek.ConfigContatos',
    'QuickPeek.ConfigSobre',
    'QuickPeek.Sobre',
    'QuickPeek.Mapa',
    'QuickPeek.FiltroMapa',
    'QuickPeek.Locais',
    'QuickPeek.ExibirMidia',
    'QuickPeek.PessoasLocal',
    'infinite-scroll',
    'QuickPeek.PerguntasLocal',
    'QuickPeek.PesquisarMapa',
    'QuickPeek.CheckIn',
    'QuickPeek.Privacidade',
    'QuickPeek.PesquisarLocaisCheckin',
    'QuickPeek.Publicacoes',
    'QuickPeek.MudarNumeroSMS',
    'QuickPeek.Respostas'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    var permissions = cordova.plugins.permissions;
    permissions.hasPermission(permissions.READ_SMS, checkPermissionCallback, null);
    permissions.hasPermission(permissions.CAMERA, checkPermissionCAMERA, null);
    
    permissions.hasPermission(permissions.ACCESS_COARSE_LOCATION, checkPermissionCallbackPrincipalLocation, null);
    permissions.hasPermission(permissions.ACCESS_FINE_LOCATION, checkPermissionCallbackLocation, null);
    permissions.hasPermission(permissions.ACCESS_LOCATION_EXTRA_COMMANDS, checkPermissionCallbackExtraLocation, null);

    function checkPermissionCAMERA(status) {
      if(!status.hasPermission) {
        var errorCallback = function() {
          console.warn('Camera permission is not turned on');
        };

        permissions.requestPermission(
            permissions.CAMERA,
            function(status) {
            if(!status.hasPermission) errorCallback();
            },
            errorCallback);
        }
    }
    
    function checkPermissionCallback(status) {
      if(!status.hasPermission) {
        var errorCallback = function() {
          console.warn('Camera permission is not turned on');
        };

        permissions.requestPermission(
            permissions.READ_SMS,
            function(status) {
            if(!status.hasPermission) errorCallback();
            },
            errorCallback);
        }
    }
    
    function checkPermissionCallbackLocation(status) {
      if(!status.hasPermission) {
        var errorCallback = function() {
          console.warn('Camera permission is not turned on');
        };

        permissions.requestPermission(
            permissions.ACCESS_FINE_LOCATION,
            function(status) {
            if(!status.hasPermission) errorCallback();
            },
            errorCallback);
        }
    }
    
    function checkPermissionCallbackExtraLocation(status) {
      if(!status.hasPermission) {
        var errorCallback = function() {
          console.warn('Camera permission is not turned on');
        };

        permissions.requestPermission(
            permissions.ACCESS_LOCATION_EXTRA_COMMANDS,
            function(status) {
            if(!status.hasPermission) errorCallback();
            },
            errorCallback);
        }
    }
    
    function checkPermissionCallbackPrincipalLocation(status) {
      if(!status.hasPermission) {
        var errorCallback = function() {
          console.warn('Camera permission is not turned on');
        };

        permissions.requestPermission(
            permissions.ACCESS_COARSE_LOCATION,
            function(status) {
            if(!status.hasPermission) errorCallback();
            },
            errorCallback);
        }
    }
  });
})

.config(function( $mdGestureProvider ) {
    $mdGestureProvider.skipClickHijack();
 })


.config(['uiMask.ConfigProvider', function(uiMaskConfigProvider) {
    uiMaskConfigProvider.maskDefinitions({'A': /[a-z]/, '*': /[a-zA-Z0-9]/});
    uiMaskConfigProvider.clearOnBlur(false);
    uiMaskConfigProvider.eventsToHandle(['input', 'keyup', 'click']);
    uiMaskConfigProvider.allowInvalidValue(true);
    uiMaskConfigProvider.addDefaultPlaceholder(false);
}])

.config(function ($mdThemingProvider) {
    var customPrimary = {
        '50': '#ffdc80',
        '100': '#ffd466',
        '200': '#ffcd4d',
        '300': '#ffc633',
        '400': '#ffbf1a',
        '500': '#ffb800',
        '600': '#e6a600',
        '700': '#cc9300',
        '800': '#b38100',
        '900': '#996e00',
        'A100': '#ffe399',
        'A200': '#ffeab3',
        'A400': '#fff1cc',
        'A700': '#805c00'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#000a08',
        '100': '#00231d',
        '200': '#003d31',
        '300': '#005646',
        '400': '#00705a',
        '500': '#00896f',
        '600': '#00bc97',
        '700': '#00d6ac',
        '800': '#00efc0',
        '900': '#0affcf',
        'A100': '#00bc97',
        'A200': '#00a383',
        'A400': '#00896f',
        'A700': '#23ffd4'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customWarn = {
        '50': '#ffb280',
        '100': '#ffa266',
        '200': '#ff934d',
        '300': '#ff8333',
        '400': '#ff741a',
        '500': '#ff6400',
        '600': '#e65a00',
        '700': '#cc5000',
        '800': '#b34600',
        '900': '#993c00',
        'A100': '#ffc199',
        'A200': '#ffd1b3',
        'A400': '#ffe0cc',
        'A700': '#803200'
    };
    $mdThemingProvider
        .definePalette('customWarn', 
                        customWarn);

    var customBackground = {
        '50': '#737373',
        '100': '#666666',
        '200': '#595959',
        '300': '#4d4d4d',
        '400': '#404040',
        '500': '#333',
        '600': '#262626',
        '700': '#1a1a1a',
        '800': '#0d0d0d',
        '900': '#000000',
        'A100': '#808080',
        'A200': '#8c8c8c',
        'A400': '#999999',
        'A700': '#000000'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground');
});