angular.module "app"
  .run ($rootScope, $state, $stateParams) ->
    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams
    $rootScope.config = angular.copy($config)
    $rootScope.api_nonce = WPAPI.api_nonce
    $rootScope.WP_SETTING = WP_SETTING

    return
