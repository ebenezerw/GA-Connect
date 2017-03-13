"use strict";

angular
  .module("gaConnect", ["ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .factory("GaFactory", ["$resource", GaFactoryFuntion])
  .controller("GaIndexController", ["GaFactory", GaIndexControllerFunction])
  .controller("GaShowController", ["$stateParams", GaShowControllerFunction])
  .controller("GaEditController", ["$stateParams", "$state", GaEditControllerFunction])
  .controller("GaNewController", ["$state", GaNewControllerFunction])

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
  return $resource("https://gist.githubusercontent.com/rodneycurl/df6c512078a645a764a13856aa1c155a/raw/c42459357d12395d6a61942791eb1d3c764625b7/ga-connect-seed-data.json")
}

function GaIndexControllerFunction(GaFactory) {
  this.GaFactory = GaFactory.get()
  // .query() expects to return an array
  // .get() expects to return an object
}

function GaShowControllerFunction($stateParams) {
  this.GaFactory = GaFactory.get({id: $stateParams.id})
}

function GaEditControllerFunction($stateParams, $state) {
  this.GaFactory = GaFactory.get({id: $stateParams.id})
  this.update = function() {
    this.GaFactory.$update({id: $stateParams.id})
  }
  this.destroy = function() {
    this.GaFactory.$delete({id: $stateParams.id})
  }
}

function GaNewControllerFunction($state) {
  this.GaFactory = new GaFactory()
  this.create = function() {
    this.GaFactory.$save()
  }
}
