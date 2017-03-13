"use strict";

angular
  .module("gaConnect", ["ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .factory("GaFactory", ["$resource", GaFactoryFuntion])
  .controller("GaIndexController", ["GaFactory", GaIndexControllerFunction])
  .controller("GaShowController", ["GaFactory", "$stateParams", GaShowControllerFunction])
  .controller("GaEditController", ["GaFactory", "$stateParams", "$state", GaEditControllerFunction])
  .controller("GaNewController", ["GaFactory", "$state", GaNewControllerFunction])

function RouterFunction($stateProvider) {
  $stateProvider
  .state("gaIndex", {
    url: "/gaconnect",
    templateUrl: "js/ng-views/index.html",
    controller: "GaIndexController",
    controllerAs: "vm"
  })
  .state("gaShow", {
    url: "gaconnect/:id",
    templateUrl: "js/ng-views/show.html",
    controller: "GaShowController",
    controllerAs: "vm"
  })
  .state("gaEdit", {
    url: "gaconnect/:id/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "GaEditController",
    controllerAs: "vm"
  })
  .state("gaNew", {
    url: "gaconnect/new",
    templateUrl: "js/ng-views/new.html",
    controller: "GaNewController",
    controllerAs: "vm"
  })
}

function GaFactoryFuntion($resource) {
  // return json file link right here
  // return $resource( "https://gist.githubusercontent.com/rodneycurl/df6c512078a645a764a13856aa1c155a/raw/104b46ade7f5d68f74f9b4c747dce33e9569c2c7/ga-connect-seed-data.json" )
  return $resource("http://localhost:3000/gaconnect/:id", {}, {
    update: {
      method: "PUT"
    }
  })
}

function GaIndexControllerFunction( GaFactory ) {
  this.users = GaFactory.query()
  // .query() expects to return an array
  // .get() expects to return an object
}

function GaShowControllerFunction( GaFactory, $stateParams ) {
  this.user = GaFactory.get({id: $stateParams.id})
}

function GaEditControllerFunction($stateParams, $state) {
  this.user = GaFactory.get({id: $stateParams.id})
  this.update = function() {
    this.user.$update({id: $stateParams.id})
  }
  this.destroy = function() {
    this.user.$delete({id: $stateParams.id})
  }
}

function GaNewControllerFunction(GaFactory, $state) {
  this.user = new GaFactory()
  this.create = function() {
    this.user.$save()
  }
}
